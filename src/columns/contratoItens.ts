import type { ColumnsType } from "antd/es/table";
import type { ContratoItem } from "../types/contratoVenda";

export const contratoItensColumns: ColumnsType<ContratoItem> = [
  {
    title: "Ativo",
    dataIndex: "Ativo",
    key: "Ativo",
  },
  {
    title: "Quantidade",
    dataIndex: "Quantidade",
    key: "Quantidade",
  },
  {
    title: "Preço Unitário",
    dataIndex: "PrecoUnitario",
    key: "PrecoUnitario",
    render: (valor) => `R$ ${valor.toFixed(2).replace(".", ",")}`,
  },
];
