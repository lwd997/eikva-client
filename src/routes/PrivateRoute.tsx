import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../main";

export const PrivateRoute = observer(() => {
  const { store } = useContext(Context);
  console.log('STORE - ', store.isAuth);

  useEffect(() => {
    console.log('AAAAAAAAAAa - ', store.isAuth)
  }, [store.isAuth]);

  return (
    store.isAuth ? 
        <Outlet /> : <Navigate to="/login" />
  );
});