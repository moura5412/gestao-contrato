/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AppContextType {
  // Exemplo: estado simples para fornecedores, você pode expandir depois
  fornecedores: any[];
  setFornecedores: React.Dispatch<React.SetStateAction<any[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fornecedores, setFornecedores] = useState<any[]>([]);

  return (
    <AppContext.Provider value={{ fornecedores, setFornecedores }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro do AppProvider");
  }
  return context;
};
