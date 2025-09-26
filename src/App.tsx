import { Route, Routes } from "react-router-dom";
import "./App.css";
import { GroupTC } from "./pages/GroupTC";
import LoginForm from "./components/LoginForm/LoginForm";
import { useContext } from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { Home } from "./pages/Home";

export const App = observer(() => {
  const { store } = useContext(Context);

  return (
    <>
      {store.isAuth ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groupTC/:groupId" element={<GroupTC />} />
        </Routes>
      ) : (
        <LoginForm />
      )}
    </>
  );
});

export default App;
