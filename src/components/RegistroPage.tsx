import dayjs from "dayjs";

import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Typography,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { getTiposAtivo } from "../services/tipoAtivo";
import { getFornecedores } from "../services/fornecedores";

import type { FormField } from "../types/formField";
import type { RegistroTypes } from "../types/registroTypes";
import type { TipoAtivo } from "../types/tipoAtivo";
import type { Rule } from "antd/es/form";
import type { Fornecedor } from "../types/fornecedor";
import type { Ativo } from "../types/ativo";
import { getAtivos } from "../services/ativos";

const { Title } = Typography;

const formConfigs: Record<keyof RegistroTypes, FormField[]> = {
  ativo: [
    { name: "id", label: "ID", type: "text", disabled: true },
    { name: "Codigo", label: "Código", type: "text" },
    { name: "Descricao", label: "Descrição", type: "text" },
    { name: "TipoAtivo", label: "Tipo de Ativo", type: "select" },
    { name: "PrecoVenda", label: "Preço de Venda", type: "number" },
  ],
  fornecedor: [
    { name: "id", label: "ID", type: "text", disabled: true },
    { name: "Codigo", label: "Código", type: "text" },
    { name: "Descricao", label: "Descrição", type: "text" },
    { name: "CNPJ", label: "CNPJ", type: "text" },
  ],
  tipoAtivo: [
    { name: "id", label: "ID", type: "text", disabled: true },
    { name: "Codigo", label: "Código", type: "text" },
    { name: "Descricao", label: "Descrição", type: "text" },
  ],
  contratoVenda: [
    { name: "id", label: "ID", type: "text", disabled: true },
    { name: "NumeroContrato", label: "Número do Contrato", type: "text" },
    { name: "DataCriacao", label: "Data de Criação", type: "date" },
    { name: "DataAlteracao", label: "Data de Alteração", type: "date" },
    { name: "Fornecedor", label: "Fornecedor", type: "select" },
    { name: "Desconto", label: "Desconto", type: "number" },
    {
      name: "ValorTotal",
      label: "Valor Total",
      type: "number",
      disabled: true,
    },
  ],
  contratoItem: [
    { name: "id", label: "ID", type: "text", disabled: true },
    { name: "Ativo", label: "Ativo", type: "select" },
    { name: "Quantidade", label: "Quantidade", type: "number" },
    { name: "PrecoUnitario", label: "Preço Unitário", type: "number" },
  ],
};

const baseRules: Record<"text" | "number" | "select", Rule[]> = {
  text: [
    { required: true, message: "Campo obrigatório" },
    { min: 2, message: "Deve conter pelo menos 2 caracteres" },
  ],
  number: [
    { required: true, message: "Campo obrigatório" },
    {
      type: "number",
      min: 0,
      message: "O valor deve ser maior ou igual a zero",
    },
  ],
  select: [{ required: true, message: "Selecione uma opção" }],
};

const dateRules: Rule[] = [
  { required: true, message: "Campo obrigatório" },
  {
    validator: (_, value) =>
      !value || dayjs.isDayjs(value)
        ? Promise.resolve()
        : Promise.reject(new Error("Data inválida")),
  },
];

const isValidCNPJ = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calc = (cnpj: string, pos: number) => {
    let soma = 0;
    let mult = pos;
    for (let i = 0; i < pos - 1; i++) {
      soma += parseInt(cnpj[i]) * mult--;
      if (mult < 2) mult = 9;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  return (
    calc(cnpj, 13) === parseInt(cnpj[12]) &&
    calc(cnpj, 14) === parseInt(cnpj[13])
  );
};

const maskCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

type RegistroPageProps<T extends keyof RegistroTypes> = {
  type: T;
  title: string;
  onSubmit: (data: RegistroTypes[T]) => void;
  initialValues?: Partial<RegistroTypes[T]>;
};

const RegistroPage = <T extends keyof RegistroTypes>({
  type,
  title,
  onSubmit,
  initialValues,
}: RegistroPageProps<T>) => {
  const [form] = Form.useForm();
  const [tipoAtivoOptions, setTipoAtivoOptions] = useState<TipoAtivo[]>([]);
  const [ativoOptions, setAtivoOptions] = useState<Ativo[]>([]);
  const [fornecedoresOptions, setFornecedoresOptions] = useState<Fornecedor[]>(
    []
  );

  useEffect(() => {
    if (type === "ativo") {
      getTiposAtivo().then((res) => setTipoAtivoOptions(res.data));
    }
    if (type === "contratoVenda") {
      getFornecedores().then((res) => setFornecedoresOptions(res.data));
    }
    if (type === "contratoItem") {
      getAtivos().then((res) => setAtivoOptions(res.data));
    }
  }, [type]);

  const fields = formConfigs[type];

  const formattedInitialValues = {
    ...initialValues,
    ...(initialValues &&
      "DataCriacao" in initialValues && {
        DataCriacao: dayjs(initialValues.DataCriacao as string),
      }),
    ...(initialValues &&
      "DataAlteracao" in initialValues && {
        DataAlteracao: dayjs(initialValues.DataAlteracao as string),
      }),
  };
  const getValidationRules = (field: FormField): Rule[] => {
    if (field.disabled) return [];

    if (field.type === "date") return dateRules;

    if (field.type === "text") {
      if (field.name === "CNPJ") {
        return [
          ...baseRules.text,
          {
            validator: (_, value: string) =>
              !value || isValidCNPJ(value)
                ? Promise.resolve()
                : Promise.reject(new Error("CNPJ inválido")),
          },
        ];
      }
      return baseRules.text;
    }

    if (field.type === "number") return baseRules.number;

    if (field.type === "select") return baseRules.select;

    return [{ required: true, message: "Campo obrigatório" }];
  };

  return (
    <div className="container">
      <Title level={3}>{title}</Title>
      <Form
        layout="vertical"
        form={form}
        initialValues={formattedInitialValues}
        onFinish={onSubmit}
      >
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={getValidationRules(field)}
          >
            {field.type === "text" && field.name === "CNPJ" ? (
              <Input
                disabled={field.disabled}
                onChange={(e) =>
                  form.setFieldsValue({
                    [field.name]: maskCNPJ(e.target.value),
                  })
                }
              />
            ) : field.type === "select" && field.name === "TipoAtivo" ? (
              <Select
                disabled={field.disabled}
                showSearch
                placeholder="Selecione o tipo de ativo"
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={tipoAtivoOptions.map((tipo) => ({
                  value: tipo.id,
                  label: tipo.Descricao,
                }))}
              />
            ) : field.type === "select" && field.name === "Ativo" ? (
              <Select
                disabled={field.disabled}
                showSearch
                placeholder="Selecione o Ativo"
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={ativoOptions.map((ativo) => ({
                  value: ativo.id,
                  label: ativo.Descricao,
                }))}
              />
            ) : field.type === "select" && field.name === "Fornecedor" ? (
              <Select
                disabled={field.disabled}
                showSearch
                placeholder="Selecione o fornecedor"
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={fornecedoresOptions.map((fornecedor) => ({
                  value: fornecedor.id,
                  label: fornecedor.id + " - " + fornecedor.Descricao,
                }))}
              />
            ) : field.type === "text" ? (
              <Input disabled={field.disabled} />
            ) : field.type === "number" && field.name !== "Quantidade" ? (
              <InputNumber
                style={{ width: "100%" }}
                disabled={field.disabled}
                formatter={(value) =>
                  `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) =>
                  Number(value?.replace(/R\$\s?|\.|,/g, "")) || 0
                }
              />
            ) : field.type === "number" ? (
              <InputNumber
                style={{ width: "100%" }}
                disabled={field.disabled}
              />
            ) : field.type === "date" ? (
              <DatePicker
                style={{ width: "100%" }}
                disabled={field.disabled}
                format="DD/MM/YYYY"
              />
            ) : null}
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistroPage;
