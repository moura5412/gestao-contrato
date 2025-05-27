import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Modal } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  createFornecedor,
  getFornecedores,
  updateFornecedor,
  deleteFornecedor,
} from "../services/fornecedores";

import {
  createTipoAtivo,
  getTiposAtivo,
  updateTipoAtivo,
  deleteTipoAtivo,
} from "../services/tipoAtivo";

import {
  createAtivo,
  getAtivos,
  updateAtivo,
  deleteAtivo,
} from "../services/ativos";

import {
  createContrato,
  getContratos,
  updateContrato,
  deleteContrato,
  getContratoById,
} from "../services/contratoVenda";

import { fornecedoresColumns } from "../columns/fornecedores";
import { tiposAtivosColumns } from "../columns/tiposAtivos";
import { ativosColumns } from "../columns/ativos";
import { contratosVendaColumns } from "../columns/contratosVenda";

import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import TableaAction from "../components/TableAction";
import RegistroPage from "../components/RegistroPage";

import type { Ativo } from "../types/ativo";
import type { Fornecedor } from "../types/fornecedor";
import type { ContratoItem, ContratoVenda } from "../types/contratoVenda";
import type { TipoAtivo } from "../types/tipoAtivo";
import type { RegistroTypes } from "../types/registroTypes";

import "../assets/styles/Home.css";
import { contratoItensColumns } from "../columns/contratoItens";

const { Content } = Layout;

const Home: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const isDetalhesContrato =
    location.pathname.includes("/contratos-venda/") &&
    params.id &&
    location.pathname.endsWith("/detalhes");

  const [currentPage, setCurrentPage] = useState("");
  const [tiposAtivos, setTiposAtivos] = useState<TipoAtivo[]>([]);
  const [contratosVenda, setContratosVenda] = useState<ContratoVenda[]>([]);
  const [contratoItems, setContratoItems] = useState<ContratoItem[]>([]);
  const [ativos, setAtivos] = useState<Ativo[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<keyof RegistroTypes | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const [modalInitialValues, setModalInitialValues] = useState<
    RegistroTypes[keyof RegistroTypes] | null
  >(null);

  function calcularValorTotalContrato(
    contrato: ContratoVenda,
    descontoEhPercentual: boolean = false
  ): number {
    const valorBruto = contrato.Itens.reduce((total, item) => {
      return total + item.PrecoUnitario * item.Quantidade;
    }, 0);

    let valorTotal: number;

    if (descontoEhPercentual) {
      valorTotal = valorBruto - (valorBruto * contrato.Desconto) / 100;
    } else {
      valorTotal = valorBruto - contrato.Desconto;
    }

    return parseFloat(valorTotal.toFixed(2));
  }

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    setCurrentPage(path);
  }, [location]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const fetchData = async () => {
    try {
      const contratoId = params.id as string;

      const [
        fornecedoresRes,
        tiposAtivoRes,
        ativosRes,
        contratoByIdRes,
        contratosVendaRes,
      ] = await Promise.all([
        getFornecedores(),
        getTiposAtivo(),
        getAtivos(),
        isDetalhesContrato
          ? getContratoById(contratoId)
          : Promise.resolve(null),
        getContratos(),
      ]);

      if (fornecedoresRes?.data) {
        setFornecedores(fornecedoresRes.data);
      }

      if (tiposAtivoRes?.data) {
        setTiposAtivos(tiposAtivoRes.data);
      }

      if (ativosRes?.data) {
        setAtivos(ativosRes.data);
      }

      if (contratosVendaRes?.data) {
        setContratosVenda(contratosVendaRes.data);
      }

      if (contratoByIdRes?.data?.Itens) {
        setContratoItems(contratoByIdRes.data.Itens);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTitle = (str: string) =>
    str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  function isContratoVenda(
    data: Partial<Fornecedor | TipoAtivo | Ativo | ContratoVenda> & {
      id?: string;
    }
  ): data is ContratoVenda {
    return (
      typeof data === "object" &&
      data !== null &&
      "NumeroContrato" in data &&
      "Fornecedor" in data &&
      "Desconto" in data
    );
  }

  const handleAdd = () => {
    setModalType(getModalTypeFromPage(currentPage));
    setModalTitle(`Adicionar ${formatTitle(currentPage)}`);
    setModalInitialValues(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: RegistroTypes[keyof RegistroTypes]) => {
    setModalType(getModalTypeFromPage(currentPage));
    setModalTitle(`Editar ${formatTitle(currentPage)}`);
    setModalInitialValues(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (
    data: Partial<Fornecedor | TipoAtivo | Ativo | ContratoVenda> & {
      id?: string;
    }
  ) => {
    try {
      if (!modalType) return;

      const isEdit = !!data.id;

      switch (modalType) {
        case "fornecedor":
          if (isEdit) {
            await updateFornecedor(data.id as string, data as Fornecedor);
          } else {
            await createFornecedor(data as Omit<Fornecedor, "id">);
          }
          break;

        case "tipoAtivo":
          if (isEdit) {
            await updateTipoAtivo(data.id as string, data as TipoAtivo);
          } else {
            await createTipoAtivo(data as Omit<TipoAtivo, "id">);
          }
          break;

        case "ativo":
          if (isEdit) {
            await updateAtivo(data.id as string, data as Ativo);
          } else {
            await createAtivo(data as Omit<Ativo, "id">);
          }
          break;

        case "contratoVenda": {
          if (!data || !isContratoVenda(data)) return;

          const itens = contratoItems;

          const contratoBase: ContratoVenda = {
            id: data.id ?? crypto.randomUUID(),
            NumeroContrato: data.NumeroContrato,
            DataCriacao: data.DataCriacao ?? new Date().toISOString(),
            DataAlteracao: new Date().toISOString(),
            Fornecedor: data.Fornecedor,
            Itens: itens,
            Desconto: data.Desconto ?? 0,
            ValorTotal: calcularValorTotalContrato(
              {
                ...data,
                Itens: itens,
                Desconto: data.Desconto ?? 0,
              },
              false
            ),
          };

          if (isEdit) {
            await updateContrato(contratoBase.id, contratoBase);
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...contratoSemId } = contratoBase;
            await createContrato(contratoSemId);
          }

          fetchData();
          setIsModalVisible(false);
          break;
        }

        case "contratoItem": {
          if (!params.id) return;

          const contratoAtual = contratosVenda.find((c) => c.id === params.id);
          if (!contratoAtual) return;

          const novosItens = [...contratoItems];
          const index = novosItens.findIndex((item) => item.id === data.id);

          if (data.id && index !== -1) {
            novosItens[index] = { ...novosItens[index], ...data };
          } else {
            const novoItem = {
              ...data,
              id: crypto.randomUUID(),
            } as ContratoItem;
            novosItens.push(novoItem);
          }

          const descontoAtualizado =
            "Desconto" in data ? data.Desconto : contratoAtual.Desconto;

          const contratoAtualizado: ContratoVenda = {
            ...contratoAtual,
            Itens: novosItens,
            Desconto: descontoAtualizado ?? 0,
            ValorTotal: calcularValorTotalContrato({
              ...contratoAtual,
              Itens: novosItens,
              Desconto: descontoAtualizado ?? 0,
            }),
          };
          await updateContrato(params.id, contratoAtualizado);

          fetchData();
          setIsModalVisible(false);
          break;
        }

        default:
          console.warn("Tipo de modal não reconhecido:", modalType);
      }

      fetchData();
      setIsModalVisible(false);
    } catch (err) {
      console.error("Erro ao salvar:", err);
      Modal.error({
        title: "Erro ao salvar",
        content: "Verifique os dados e tente novamente.",
      });
    }
  };

  const handleDelete = async (record: RegistroTypes[keyof RegistroTypes]) => {
    Modal.confirm({
      title: "Tem certeza que deseja excluir este registro?",
      content: "Esta ação não poderá ser desfeita.",
      okText: "Sim",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          switch (modalType || getModalTypeFromPage(currentPage)) {
            case "fornecedor":
              await deleteFornecedor(record.id as string);
              break;
            case "tipoAtivo":
              await deleteTipoAtivo(record.id as string);
              break;
            case "ativo":
              await deleteAtivo(record.id as string);
              break;
            case "contratoVenda":
              await deleteContrato(record.id as string);
              break;
            case "contratoItem": {
              if (!params.id) return;

              const contratoOriginal = contratosVenda.find(
                (c) => c.id === params.id
              );
              if (!contratoOriginal) return;

              const itensFiltrados = contratoItems.filter(
                (item) => item.id !== record.id
              );

              const contratoAtualizado = {
                ...contratoOriginal,
                Itens: itensFiltrados,
                ValorTotal: calcularValorTotalContrato({
                  ...contratoOriginal,
                  Itens: itensFiltrados,
                }),
              };

              await updateContrato(params.id, contratoAtualizado);

              fetchData();
              break;
            }
            default:
              return;
          }

          fetchData();
        } catch (error) {
          console.error("Erro ao deletar:", error);
          Modal.error({
            title: "Erro ao deletar",
            content: "Ocorreu um erro ao tentar excluir o registro.",
          });
        }
      },
    });
  };

  const getModalTypeFromPage = (page: string): keyof RegistroTypes | null => {
    if (isDetalhesContrato) return "contratoItem";

    switch (page) {
      case "fornecedores":
        return "fornecedor";
      case "tipos-ativos":
        return "tipoAtivo";
      case "ativos":
        return "ativo";
      case "contratos-venda":
        return "contratoVenda";
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (currentPage === "fornecedores") {
      return (
        <TableaAction
          titulo="Lista de Fornecedores"
          data={fornecedores}
          colunas={fornecedoresColumns}
          rowKey="id"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    }

    if (currentPage === "tipos-ativos") {
      return (
        <TableaAction
          titulo="Tipos de Ativos"
          data={tiposAtivos}
          colunas={tiposAtivosColumns}
          rowKey="id"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    }

    if (currentPage === "ativos") {
      return (
        <TableaAction
          titulo="Ativos"
          data={ativos}
          colunas={ativosColumns}
          rowKey="id"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    }

    if (isDetalhesContrato) {
      return (
        <TableaAction
          titulo={`Itens do Contrato #${params.id}`}
          data={contratoItems}
          colunas={contratoItensColumns}
          rowKey="id"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      );
    }

    if (currentPage === "contratos-venda") {
      return (
        <TableaAction
          titulo={"Contratos de Venda"}
          data={contratosVenda}
          colunas={contratosVendaColumns}
          rowKey="id"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isContratoVendaPage
        />
      );
    }

    return <div>Selecione uma opção no menu</div>;
  };

  return (
    <Layout>
      <AppHeader />

      <Content className="content">
        <Breadcrumb
          className="breadcrumb"
          items={[
            {
              title: (
                <span className="item" onClick={() => handleNavigate("/")}>
                  Home
                </span>
              ),
            },
            ...(isDetalhesContrato
              ? [
                  {
                    title: (
                      <span
                        className="item"
                        onClick={() => handleNavigate("/contratos-venda")}
                      >
                        Contratos Venda
                      </span>
                    ),
                  },
                  {
                    title: <span className="item">{params.id}</span>,
                  },
                  {
                    title: <span className="item">Detalhes</span>,
                  },
                ]
              : currentPage
              ? [
                  {
                    title: (
                      <span
                        className="item"
                        onClick={() => handleNavigate(`/${currentPage}`)}
                      >
                        {formatTitle(currentPage)}
                      </span>
                    ),
                  },
                ]
              : []),
          ]}
        />
        <div className="box">{renderContent()}</div>
      </Content>

      <AppFooter />

      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        destroyOnHidden={true}
        width={600}
      >
        {modalType && (
          <RegistroPage
            type={modalType}
            title={modalTitle}
            onSubmit={handleSubmit}
            initialValues={modalInitialValues ?? undefined}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default Home;
