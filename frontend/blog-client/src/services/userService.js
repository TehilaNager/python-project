import httpService from "./httpSrvice";

async function register(values) {
    const response = await httpService.post("/register/", values)
    return response.data;
}

async function login(values) {
    const response = await httpService.post("/token/", values);

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    httpService.setDefaulHeaders("Authorization", "Bearer " + response.data.access);

    return response.data;
}

async function refreshToken() {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) throw new Error("No refresh token available");

    const response = await httpService.post("/token/refresh/", { refresh });
    const newAccess = response.data.access;

    localStorage.setItem("access", newAccess);
    httpService.setDefaulHeaders("Authorization", "Bearer " + newAccess);

    return newAccess;
}

const userService = {
    register,
    login,
    refreshToken
}

export default userService;