# Projeto de Cadastro com Vue.js e MongoDB

Este projeto consiste em uma aplicação fullstack simples para cadastro de usuários, com frontend em Vue.js e backend em Node.js com Express e MongoDB.

---

## Estrutura do projeto

- `/server`  
  Backend em Node.js usando Express e Mongoose para conexão com MongoDB.

- `/client`  
  Frontend em Vue.js com Vite como bundler.

---

## Pré-requisitos

- Node.js (versão 18+ recomendada)
- MongoDB rodando localmente ou em algum serviço acessível
- npm ou yarn para instalar dependências

---

## Como rodar o projeto

### 1. Rodar o backend (server)

```bash
cd server
npm install
npm start
```

> Certifique-se de que o MongoDB está rodando em `mongodb://localhost:27017`.

---

### 2. Rodar o frontend (client)

```bash
cd client
npm install
npm run dev
```

O frontend estará disponível por padrão em: `http://localhost:5173`

---

## Endpoints da API

- `POST /registration`  
  Rota para cadastrar um novo usuário. Espera um JSON com os dados do formulário.

---

## Tecnologias usadas

- **Frontend:** Vue.js 3, Vite  
- **Backend:** Node.js, Express, Mongoose  
- **Banco de dados:** MongoDB  

---

## Contato

Para dúvidas ou sugestões, entre em contato.
