import { api } from "./api";
import type { Ativo } from "../types/ativo";

export const getAtivos = () => api.get<Ativo[]>("/ativo");
export const getAtivoId = (id: string) => api.get<Ativo[]>(`/ativo/${id}`);
export const createAtivo = (data: Omit<Ativo, "id">) =>
  api.post("/ativo", data);
export const updateAtivo = (id: string, data: Ativo) =>
  api.put(`/ativo/${id}`, data);
export const deleteAtivo = (id: string) => api.delete(`/ativo/${id}`);