import { api } from "./api";
import type { ContratoVenda } from "../types/contratoVenda";

export const getContratos = () => api.get<ContratoVenda[]>("/contrato_de_venda");
export const getContratoById = (id: string) => api.get(`/contrato_de_venda/${id}`);
export const createContrato = (data: Omit<ContratoVenda, "id">) =>
  api.post("/contrato_de_venda", data);
export const updateContrato = (id: string, data: ContratoVenda) =>
  api.put(`/contrato_de_venda/${id}`, data);
export const deleteContrato = (id: string) =>
  api.delete(`/contrato_de_venda/${id}`);