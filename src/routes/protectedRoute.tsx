import { Navigate } from "react-router-dom";
import { storage } from "../store/store";
import { type FC } from "react";
import { observer } from "mobx-react-lite";

interface RouteChild {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<RouteChild> = observer(({ children }) => {
  const { isAuth } = storage;

  return isAuth ? children : <Navigate to="/login" />;
});
