import { Route, Routes } from "react-router-dom";
import { GroupTC } from "../pages/GroupTC";
import { NotFound } from "../pages/NotFound";
import {ProtectedRoute} from "./protectedRoute";
import { Home } from "../pages/Home";

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/group-tc/:idGroup" element={<ProtectedRoute><GroupTC/></ProtectedRoute>}/>
        <Route path="*" element={<ProtectedRoute><NotFound/></ProtectedRoute>}/>
    </Routes>
  );
};
