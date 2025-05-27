import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.replace("/", "");

  const handleClick: MenuProps["onClick"] = (e) => {
    navigate(e.key === "" ? "/" : `/${e.key}`);
  };

  return (
    <Layout.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[currentPath]}
        onClick={handleClick}
        items={[
          { key: "", label: "Home" },
          { key: "fornecedores", label: "Fornecedores" },
          { key: "tipos-ativos", label: "Tipos de Ativos" },
          { key: "ativos", label: "Ativos" },
          { key: "contratos-venda", label: "Contratos de Venda" },
        ]}
      />
    </Layout.Header>
  );
};

export default AppHeader;
