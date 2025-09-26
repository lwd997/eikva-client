import { makeAutoObservable } from "mobx";
import { login, register, logout } from "../services/AuthService";
import type { User } from "../models/User";

export default class Store {
  
  isAuth:boolean = false;
  user = {} as User;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(val: boolean) {
    this.isAuth = val;
  }

  setUser(user: User) {
    this.user = user;
  }

  async login(loginName: string, password: string) {
    try {
      const response = await login(loginName, password);
      localStorage.setItem("access_token", response.data.access_token);
      this.setAuth(true);
      this.setUser({login: loginName});
    } catch (error) {
      console.log(error);
    }
  }

  async register(loginName: string, password: string) {
    try {
      const response = await register(loginName, password);
      localStorage.setItem("access_token", response.data.access_token);
      this.setAuth(true);
      this.setUser({login: loginName});
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await logout();
      localStorage.removeItem("access_token");
      this.setAuth(false);
      this.setUser({login: ''});
    } catch (error) {
      console.log(error);
    }
  }
}