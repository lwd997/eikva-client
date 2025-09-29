import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { GroupTC } from "../pages/GroupTC";
import { NotFound } from "../pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";
import MainLayout from "../components/MainLayout/MainLayout";

export const AppRoutes = () => {
  const navigationRoutes = [
    { path: "/", element: <Home /> },
    { path: "/group-tc/:idGroup", element: <GroupTC /> },
    { path: "*", element: <NotFound /> },
  ];
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          {navigationRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

