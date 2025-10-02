import { Main } from "./pages/Main";
import { useSyncExternalStore } from "react";
import { Login } from "./pages/Login";
import { appStore } from "./Storage";

const App = () => {
    const store = useSyncExternalStore(appStore.subscribe, appStore.getSnapshot);
    return !store.isAuthorized ? <Login /> : <Main />;
};

export default App;

