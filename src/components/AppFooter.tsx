import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className="footer">
      Sistema de Gestão de Contratos - Gabriel moura ©{new Date().getFullYear()}
    </Footer>
  );
};

export default AppFooter;
