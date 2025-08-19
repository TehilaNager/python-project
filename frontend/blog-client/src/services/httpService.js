import axios from "axios";
import config from "../config.json"

axios.defaults.baseURL = config.apiUrl;

function setDefaulHeaders(headerName, value) {
    return axios.defaults.headers.common[headerName] = value;
}

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = localStorage.getItem("refresh");
                if (!refresh) throw new Error("No refresh token");

                const { data } = await axios.post("/api/token/refresh/", { refresh });
                const newAccess = data.access;

                localStorage.setItem("access", newAccess);
                setDefaulHeaders("Authorization", "Bearer " + newAccess);
                originalRequest.headers["Authorization"] = "Bearer " + newAccess;

                return axios(originalRequest);
            } catch (err) {
                localStorage.clear();
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
    setDefaulHeaders
}

export default httpService;