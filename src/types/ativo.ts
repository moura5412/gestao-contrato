import type { TipoAtivo } from "./tipoAtivo";

export interface Ativo {
  id: string;
  Codigo: string;
  Descricao: string;
  TipoAtivo: TipoAtivo;
  PrecoVenda: number;
}