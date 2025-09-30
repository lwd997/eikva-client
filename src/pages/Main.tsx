import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Group } from "./Group";
import { useEffect } from "react";
import { appStore } from "../Storage";
import { http } from "../http";
import type { WhoAmIResponse } from "../models/Auth";

export const Main = () => {
    useEffect(() => {
        const checkSession = async () => {
            const response = await http.request<WhoAmIResponse>("/auth/whoami")
            const isOk = response.status === 200;
            appStore.updatePart({
                isAuthorized: isOk,
                userUUID: isOk ? response.body.uuid : null,
                userLogin: isOk ? response.body.uuid : null
            });
        }

        checkSession();
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex'
            }}
        >
            <div
                style={{
                    width: '30%',
                    height: '100%',
                }}
            >
                <Sidebar />
            </div>
            <div
                style={{
                    width: '70%',
                    height: '100%',
                }}
            >
                <Routes>
                    <Route path="/:group" element={<Group />} />
                </Routes>
            </div>
        </div>
    );
};
