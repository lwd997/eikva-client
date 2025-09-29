import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { AppRoutes } from "./routes/routes";
// import { storage } from "./store/store";
// import { Home } from "./pages/Home";
// import { Navigate} from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import { useEffect } from "react";
import { storage } from "./store/store";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { checkAuth } = storage;
  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      checkAuth(refreshToken);
    }
  }, []);

  return (
    <div className="app">
      <AppRoutes/>
    </div>
  );
});

export default App;
