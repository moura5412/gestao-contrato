import { api } from "./api";
import type { Fornecedor } from "../types/fornecedor";

export const getFornecedores = () => api.get<Fornecedor[]>("/fornecedores");
export const getFornecedorId = (id: string) => api.get<Fornecedor[]>(`/fornecedores/${id}`);
export const createFornecedor = (data: Omit<Fornecedor, "id">) =>
  api.post("/fornecedores", data);
export const updateFornecedor = (id: string, data: Fornecedor) =>
  api.put(`/fornecedores/${id}`, data);
export const deleteFornecedor = (id: string) =>
  api.delete(`/fornecedores/${id}`);