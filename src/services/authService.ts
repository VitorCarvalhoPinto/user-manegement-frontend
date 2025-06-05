import api from "../api/axios";

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const register = (name: string, email: string, password: string) =>
  api.post("/auth/register", { name, email, password });
