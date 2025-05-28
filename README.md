# Gestão de Contratos

Sistema web para gerenciamento de contratos de venda, ativos, fornecedores e tipos de ativos. Desenvolvido com foco em responsividade e usabilidade, utilizando React, TypeScript e Ant Design.

## Tecnologias Utilizadas

- **React** com **TypeScript** – Framework principal para construção da interface do usuário.
- **Vite** – Ferramenta moderna para bundling e ambiente de desenvolvimento rápido.
- **Ant Design** – Biblioteca de componentes UI para React, com foco em consistência visual e acessibilidade.
- **React Router DOM** – Gerenciamento de rotas SPA.
- **Axios** – Cliente HTTP para comunicação com APIs REST.
- **uuid** – Utilizado para gerar identificadores únicos.
- **CSS tradicional** – Utilizado para estilização, sem uso de CSS Modules ou Styled Components.

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

### Passos para executar localmente:

1. **Clone o repositório:**

git clone https://github.com/moura5412/gestao-contrato.git
cd gestao-contrato

2. **Clone o repositório:**

npm install

3. **Execute o projeto em modo de desenvolvimento:**

npm run dev

4. **Acesse no navegador:**

http://localhost:5173

## Funcionalidades

- Listagem, cadastro, edição e exclusão de:
  - Contratos de venda
  - Fornecedores
  - Ativos
  - Tipos de Ativos
- Itens de contrato associados a contratos de venda
- Modal para criação/edição com validação de campos
- Layout responsivo adaptado para dispositivos móveis
- Interface limpa e intuitiva com componentes Ant Design

## Decisões Técnicas

- Ant Design foi utilizado como base de componentes UI para garantir uma experiência visual padronizada e responsiva.
- React Router DOM foi adotado para navegação SPA entre as páginas do sistema.
- Axios foi escolhido pela simplicidade e suporte a interceptadores para requisições e respostas.
- Vite substitui o CRA (Create React App) para acelerar builds e hot reloads.
- A estilização é feita com CSS padrão e organização por escopo de responsabilidade (por exemplo: AppHeader.css).
- Utilização de modais dinâmicos e componentes reutilizáveis (ModalForm, TableaAction) para CRUD.
