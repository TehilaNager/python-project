import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

function setDefaultHeaders(headerName, value) {
    if (value) axios.defaults.headers.common[headerName] = value;
    else delete axios.defaults.headers.common[headerName];
}

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem("access");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
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

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            isRefreshing = true;

            const refresh = localStorage.getItem("refresh");
            if (refresh) {
                try {
                    const { data: refreshData } = await axios.post("/token/refresh/", { refresh });
                    const newAccess = refreshData.access;
                    localStorage.setItem("access", newAccess);
                    setDefaultHeaders("Authorization", "Bearer " + newAccess);
                    originalRequest.headers["Authorization"] = "Bearer " + newAccess;
                    processQueue(null, newAccess);
                    return axios(originalRequest);
                } catch (err) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    processQueue(err, null);
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            } else {
                localStorage.removeItem("access");
                processQueue(new Error("No refresh token available"), null);
                return Promise.reject(error);
            }
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
