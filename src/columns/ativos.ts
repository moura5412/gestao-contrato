import type { ColumnsType } from "antd/es/table";
import type { Ativo } from "../types/ativo";

export const ativosColumns: ColumnsType<Ativo> = [
  { title: "Código", dataIndex: "Codigo", key: "Codigo" },
  { title: "Descrição", dataIndex: "Descricao", key: "Descricao" },
  {
    title: "Tipo de Ativo",
    dataIndex: "TipoAtivo", 
    key: "TipoAtivo",
  },
  { title: "Preço de Venda", dataIndex: "PrecoVenda", key: "PrecoVenda" },
];
