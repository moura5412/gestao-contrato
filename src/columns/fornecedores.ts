import type { ColumnsType } from "antd/es/table";
import type { Fornecedor } from "../types/fornecedor";

export const fornecedoresColumns: ColumnsType<Fornecedor> = [
  { title: "Código", dataIndex: "Codigo", key: "Codigo" },
  { title: "Descrição", dataIndex: "Descricao", key: "Descricao" },
  { title: "CNPJ", dataIndex: "CNPJ", key: "CNPJ" },
];
