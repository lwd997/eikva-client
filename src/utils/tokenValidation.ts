// import { useEffect, useState } from "react";

// function getExpDate(token: string) {
//     try {
//         const sessionInfo = token?.split(".")[1].toString();
//         let expTimestapm = JSON.parse(format.UNBASE64(sessionInfo!).exp);
//         return new Date(expTimestapm * 1000);
//     }
// }

// export const useTokenValidation = () => {
//     const [isTokenValid, setTokenValid] = useState<boolean | null>(null);
//     const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("access_token"));
//     const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refresh_token"));

//     useEffect(() => {
//         if (!accessToken || !refreshToken) {
//             setTokenValid(false);
//             return;
//         }
//         setTokenValid(true);

//     });
// }