import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home";

import "./assets/styles/Global.css";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Listas */}
          <Route path="/fornecedores" element={<Home />} />
          <Route path="/tipos-ativos" element={<Home />} />
          <Route path="/ativos" element={<Home />} />
          <Route path="/contratos-venda" element={<Home />} />
          <Route path="/contratos-venda/:id/detalhes" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
