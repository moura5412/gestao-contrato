import { Table, Button, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import type { ColumnsType } from "antd/es/table";

import "../assets/styles/TableAction.css";

interface TableaActionProps<T> {
  titulo: string;
  data: T[];
  colunas: ColumnsType<T>;
  rowKey: string;
  onAdd?: () => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  isContratoVendaPage?: boolean;
}

function TableaAction<T extends object>({
  titulo,
  data,
  colunas,
  rowKey,
  onAdd,
  onEdit,
  onDelete,
  isContratoVendaPage,
}: TableaActionProps<T>) {
  const navigate = useNavigate();

  const colunasComAcoes: ColumnsType<T> = [
    ...colunas,
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit && onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete && onDelete(record)}
          />
          {isContratoVendaPage && (
            <Button
              icon={<UnorderedListOutlined />}
              onClick={() =>
                navigate(
                  `/contratos-venda/${
                    (record as { id: string | number }).id
                  }/detalhes`
                )
              }
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="box">
      <div className="box-header">
        <h2 className="titulo">{titulo}</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => onAdd && onAdd()}
        >
          Adicionar
        </Button>
      </div>
      <Table<T>
        dataSource={data}
        columns={colunasComAcoes}
        rowKey={rowKey}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default TableaAction;
