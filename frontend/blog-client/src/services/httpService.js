import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;


function isTokenExpired(token) {
    if (!token) return true;
    try {
        const { exp } = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        return exp < now;
    } catch (err) {
        return true;
    }
};

function setDefaultHeaders(headerName, value) {
    if (value) axios.defaults.headers.common[headerName] = value;
    else delete axios.defaults.headers.common[headerName];
};

axios.interceptors.request.use(
    async config => {
        let token = localStorage.getItem("access");

        if (token && isTokenExpired(token)) {
            const refresh = localStorage.getItem("refresh");
            if (refresh) {
                try {
                    const { data } = await axios.post("/api/token/refresh/", { refresh });
                    token = data.access;
                    localStorage.setItem("access", token);
                    setDefaultHeaders("Authorization", "Bearer " + token);
                } catch (err) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    token = null;
                }
            } else {
                localStorage.removeItem("access");
                token = null;
            }
        }

        if (token) config.headers["Authorization"] = "Bearer " + token;

        return config;
    },
    error => Promise.reject(error)
);

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const data = error.response?.data;

        const isTokenExpiredError =
            (status === 401) ||
            (status === 403 && data?.messages?.some(msg => msg.message.includes("Token is expired")));

        if (isTokenExpiredError && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh = localStorage.getItem("refresh");

            if (refresh) {
                try {
                    const { data: refreshData } = await axios.post("/api/token/refresh/", { refresh });
                    const newAccess = refreshData.access;
                    localStorage.setItem("access", newAccess);
                    setDefaultHeaders("Authorization", "Bearer " + newAccess);
                    originalRequest.headers["Authorization"] = "Bearer " + newAccess;

                    return axios(originalRequest);
                } catch (err) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    return Promise.reject(error);
                }
            } else {
                localStorage.removeItem("access");
                return Promise.reject(error);
            }
        }

        if (status === 403 && !isTokenExpiredError) {
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setDefaultHeaders
};

export default httpService;
