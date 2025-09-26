import { useEffect, useState } from "react"

export const useTokenValidation = () => {
    const [isTokenValid, setTokenValid] = useState<boolean | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("access_token"));
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refresh_token"));

    useEffect(() => {
        if (!accessToken || !refreshToken) {
            setTokenValid(false);
            return;
        }
        setTokenValid(true);
        
    });
}