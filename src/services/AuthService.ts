import $api from "../http";
import type { LoginResponse, LogoutResponse } from "../models/Auth";


export const login = async ( login: string, password: string) => {
    return $api.post<LoginResponse>('/auth/login', { login, password });
}

export const register = async ( login: string, password: string) => {
    return $api.post<LoginResponse>('/auth/register', { login, password });
}

export const logout = async () => {
    return $api.post<LogoutResponse>('/auth/logout');
}