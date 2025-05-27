import type { Ativo } from "./ativo";
import type { Fornecedor } from "./fornecedor";
import type { TipoAtivo } from "./tipoAtivo";
import type { ContratoVenda, ContratoItem } from "./contratoVenda";

export type RegistroTypes = {
  ativo: Ativo;
  fornecedor: Fornecedor;
  tipoAtivo: TipoAtivo;
  contratoVenda: ContratoVenda;
  contratoItem: ContratoItem;
};