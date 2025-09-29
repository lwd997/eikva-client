import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "./protectedRoute";
import { Main } from "../pages/Main";
import { observer } from "mobx-react-lite";

export const AppRoutes = observer(() => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/*" element={<ProtectedRoute><Main /></ProtectedRoute>}/>
    </Routes>
  );
});
