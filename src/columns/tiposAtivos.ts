import type { ColumnsType } from "antd/es/table";
import type { TipoAtivo } from "../types/tipoAtivo";

export const tiposAtivosColumns: ColumnsType<TipoAtivo> = [
  { title: "Código", dataIndex: "Codigo", key: "Codigo" },
  { title: "Descrição", dataIndex: "Descricao", key: "Descricao" },
];