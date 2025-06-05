import api from "../api/axios";
import { AxiosRequestConfig } from "axios";

export const getProfile = (config: AxiosRequestConfig) =>
  api.get("/users/profile", config);

export const updateProfile = (data: any, config: AxiosRequestConfig) =>
  api.patch("/users/profile", data, config);

export const getUsers = (params: URLSearchParams, config: AxiosRequestConfig) =>
  api.get(`/users?${params.toString()}`, config);

export const getInactiveUsers = (config: AxiosRequestConfig) =>
  api.get("/users/inactive", config);

export const updateUser = (id: string, data: any, config: AxiosRequestConfig) =>
  api.patch(`/users/${id}`, data, config);

export const deleteUser = (id: string, config: AxiosRequestConfig) =>
  api.delete(`/users/${id}`, config);
