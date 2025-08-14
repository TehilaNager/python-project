import axios from "axios";
import config from "../config.json"

axios.defaults.baseURL = config.apiUrl;

function setDefaulHeaders(headerName, value) {
    return axios.defaults.headers.common[headerName] = `Bearer ${value}`;
}

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
    setDefaulHeaders
}

export default httpService;