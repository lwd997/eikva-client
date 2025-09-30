import { useState } from "react";
import { http } from "../http";
import type { TokenResponse } from "../models/Auth";
import { appStore } from "../Storage";

export const Login = () => {
    const [formType, setFormType] = useState<"login" | "register">("login");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        const requestPath = formType === "login"
            ? "/auth/login"
            : "/auth/register"

        const response = await http.request<TokenResponse>(requestPath, {
            method: "POST",
            body: { login, password }
        });

        if (response.status === 200) {
            http.updateTokens(response.body);
            appStore.updateField('isAuthorized', true);
        }
    }

    const toggleFormType = () => {
        setFormType( formType === "login" ? "register" : "login");
    }

    return (
        <>
            {formType}
            <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите логин"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
            />
            <button onClick={handleSubmit}>go</button>
            <button onClick={toggleFormType}>switch</button>
        </>
    );
}
