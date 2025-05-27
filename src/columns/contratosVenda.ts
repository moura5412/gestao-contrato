import dayjs from "dayjs";

import type { ColumnsType } from "antd/es/table";
import type { ContratoVenda } from "../types/contratoVenda";

export const contratosVendaColumns: ColumnsType<ContratoVenda> = [
  { title: "Número do Contrato", dataIndex: "NumeroContrato", key: "NumeroContrato" },
  {
    title: "Data de Criação",
    dataIndex: "DataCriacao",
    key: "DataCriacao",
    render: (value: string) => (value ? dayjs(value).format("DD/MM/YYYY") : "-"),
  },
  {
    title: "Data de Alteração",
    dataIndex: "DataAlteracao",
    key: "DataAlteracao",
    render: (value: string) => (value ? dayjs(value).format("DD/MM/YYYY") : "-"),
  },
  {
    title: "Fornecedor",
    dataIndex: "Fornecedor",
    key: "Fornecedor",
  },
  { title: "Desconto", dataIndex: "Desconto", key: "Desconto" },
  { title: "Valor Total", dataIndex: "ValorTotal", key: "ValorTotal" },
];
