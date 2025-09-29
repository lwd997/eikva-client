import { createContext } from "react";
import { createRoot } from "react-dom/client";
import "./normalize.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { storage } from "./store/store.ts";

class RootStore {
  store = storage;
}

export const Context = createContext<RootStore | null>(null);

createRoot(document.getElementById("root")!).render(
<BrowserRouter>
    <Context.Provider value={new RootStore()}>
        <App />      
    </Context.Provider>
  </BrowserRouter>
);
