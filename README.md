# Teste Mercado Bitcoin

Este projeto é uma aplicação simples de cadastro de usuários, composta por:

- **Front-end** com Vue 3 (sem TypeScript)
- **Back-end** com Node.js + Express + MongoDB (Mongoose)
- Integração entre front e back, com persistência no banco de dados MongoDB

---

## 🗂 Estrutura de pastas

```
.
├── client/     # Front-end Vue 3
└── server/     # Back-end Express + MongoDB
```

---

## 🚀 Como executar

### Pré-requisitos

- Node.js
- MongoDB (rodando localmente, porta padrão 27017)

### 1. Iniciar o Back-end

```bash
cd server
npm install
node index.js
```

Servidor rodando em: `http://localhost:3000`

### 2. Iniciar o Front-end

```bash
cd client
npm install
npm run dev
```

Aplicação em: `http://localhost:5173`

---

## 📋 Endpoints da API

| Método | Rota           | Descrição                    |
|--------|----------------|------------------------------|
| POST   | /registration  | Cria um novo usuário         |
| GET    | /registration  | Lista todos os usuários      |

---

## 📝 Observações

- A aplicação usa `fetch` para comunicar com o backend.
- A listagem de cadastros pode ser vista após um cadastro, através de um botão "Ver Cadastros".
- Os dados são exibidos do mais recente para o mais antigo.

---

## 📌 Tecnologias

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

---

André Romário.
[http    ](https://andreromariodev.github.io/)
[http    ](https://www.linkedin.com/in/andre-romario-dev/)