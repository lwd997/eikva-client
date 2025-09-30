import { Main } from "./pages/Main";
import { useSyncExternalStore } from "react";
import { Login } from "./pages/Login";
import { appStore } from "./Storage";
import "./App.css";

const App = () => {
    const store = useSyncExternalStore(appStore.subscribe, appStore.getSnapshot);
    return !store.isAuthorized ? <Login /> : <Main />;
};

export default App;
