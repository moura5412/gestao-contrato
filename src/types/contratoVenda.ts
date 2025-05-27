import type { Ativo } from "./ativo";
import type { Fornecedor } from "./fornecedor";

export interface ContratoItem {
  id: string;
  Ativo: Ativo;
  Quantidade: number;
  PrecoUnitario: number;
}

export interface ContratoVenda {
  id: string;
  NumeroContrato: string;
  DataCriacao: string;
  DataAlteracao: string;
  Fornecedor: Fornecedor;
  Itens: ContratoItem[];
  Desconto: number;
  ValorTotal: number;
}