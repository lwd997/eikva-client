import { makeAutoObservable } from "mobx";
import { login, register, logout, updateToken } from "../services/AuthService";
// import { useNavigate } from "react-router-dom";

export class Store {
  
  isAuth: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(val: boolean) {
    this.isAuth = val;
  }

  setLoading(val: boolean) {
    this.isLoading = val;
  }

  login = async (loginName: string, password: string, onNavigate: () => void) => {
    try {
      const response = await login(loginName, password);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      this.setAuth(true);
      onNavigate();
    } catch (error) {
      console.log(error);
    }
  }

  register = async (loginName: string, password: string, onNavigate: () => void) => {
    try {
      const response = await register(loginName, password);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      this.setAuth(true);
      onNavigate();
    } catch (error) {
      console.log(error);
    }
  }

 logout = async () => {
    try {
      await logout();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.setAuth(false);
    } catch (error) {
      console.log(error);
    }
  }

  checkAuth = async (refresh_token: string) => {
    this.setLoading(true);
    try {
      const response = await updateToken(refresh_token);
      console.log('CHECK AUTH - ', response.data)
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      this.setAuth(true);
    } catch (error) {
        console.log(error);
    } finally {
        this.setLoading(false);
    }
  }
}

export const storage = new Store();