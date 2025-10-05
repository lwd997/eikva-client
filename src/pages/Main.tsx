import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Group } from "./Group";
import { useEffect, useState } from "react";
import { appStore } from "../Storage";
import { http } from "../http";
import type { WhoAmIResponse } from "../models/Auth";

export const Main = () => {
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const response = await http.request<WhoAmIResponse>("/auth/whoami")
            const isOk = response.status === 200;
            appStore.updatePart({
                isAuthorized: isOk,
                userUUID: isOk ? response.body.uuid : null,
                userLogin: isOk ? response.body.uuid : null
            });

            if (isOk) {
                setIsChecking(false);
            }
        }

        checkSession();
    }, []);

    if (isChecking) {
        // TODO: Сделать прелоадер/скелетон
        return "Загрузка...";
    }

    return (
        <div className="display-flex width-100 height-100">
            <Sidebar />
            <div className="content display-flex flex-direction-column">
                <Routes>
                    <Route path="/:group" element={<Group />} />
                </Routes>
            </div>
        </div>
    );
};
