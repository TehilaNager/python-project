import httpService from "./httpService";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "access";

function getJWT() {
    return localStorage.getItem(TOKEN_KEY);
};

function getUser() {
    try {
        const token = getJWT();
        if (!token) return null;
        return jwtDecode(token);
    } catch {
        return null;
    };
};

function isAdmin() {
    const user = getUser();
    return user?.isadmin === true;
};


async function register(values) {
    const response = await httpService.post("/register/", values)
    return response.data;
};

async function login(values) {
    const response = await httpService.post("/token/", values);

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    httpService.setDefaultHeaders("Authorization", "Bearer " + response.data.access);

    return response.data;
};

async function refreshToken() {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) throw new Error("No refresh token available");

    const response = await httpService.post("/token/refresh/", { refresh });
    const newAccess = response.data.access;

    localStorage.setItem(TOKEN_KEY, newAccess);
    httpService.setDefaultHeaders("Authorization", "Bearer " + newAccess);

    return newAccess;
};

function logOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("refresh");
    httpService.setDefaultHeaders("Authorization", "");
};

const userService = {
    register,
    login,
    refreshToken,
    logOut,
    getUser,
    isAdmin
};

export default userService;