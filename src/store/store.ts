import { makeAutoObservable } from "mobx";
import { login, register, logout } from "../services/AuthService";

export default class Store {
  
  isAuth: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(val: boolean) {
    this.isAuth = val;
  }

  login = async (loginName: string, password: string) => {
    try {
        console.log('LOGIN ')
      const response = await login(loginName, password);
      console.log('LOGIN 2')
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      console.log('LOGIN 3')
      this.setAuth(true);
      console.log('LOGIN - ', this.isAuth)
    } catch (error) {
      console.log(error);
    }
  }

  register = async (loginName: string, password: string) => {
    try {
      const response = await register(loginName, password);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      this.setAuth(true);
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
}