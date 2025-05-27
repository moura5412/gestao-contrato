import { api } from "./api";
import type { TipoAtivo } from "../types/tipoAtivo";

export const getTiposAtivo = () => api.get<TipoAtivo[]>("/tipo_ativo");
export const getTipoAtivoId = (id: string) => api.get<TipoAtivo[]>(`/tipo_ativo/${id}`);
export const createTipoAtivo = (data: Omit<TipoAtivo, "id">) =>
  api.post("/tipo_ativo", data);
export const updateTipoAtivo = (id: string, data: TipoAtivo) =>
  api.put(`/tipo_ativo/${id}`, data);
export const deleteTipoAtivo = (id: string) =>
  api.delete(`/tipo_ativo/${id}`);