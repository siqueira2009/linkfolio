# Linkfolio

Linkfolio é uma aplicação self-hosted para criar sua própria página de links (no estilo Linktree), com **backend** e **frontend** separados, distribuídos como imagens Docker e orquestrados via **Docker Compose**.

## 📋 Sobre o projeto

Este repositório contém a configuração necessária para implantar o Linkfolio usando Docker, consumindo as imagens já publicadas:

- `siqueira2009/linkfolio-backend` - API responsável pela autenticação (JWT) e persistência dos dados
- `siqueira2009/linkfolio-frontend` - interface web da aplicação

## 🛠️ Tecnologias utilizadas

- **Docker** e **Docker Compose**
- **JWT** - autenticação
- Volume Docker para persistência dos dados do usuário

## 📁 Estrutura do repositório

```
linkfolio/
├── .env.example         # Exemplo das variáveis de ambiente necessárias
├── .gitignore
└── docker-compose.yml   # Orquestração dos serviços de backend e frontend
```

## ⚙️ Variáveis de ambiente

Antes de iniciar a aplicação, copie o arquivo de exemplo e configure as variáveis:

```bash
cp .env.example .env
```

| Variável             | Descrição                                                                 |
| -------------------- | -------------------------------------------------------------------------- |
| `JWT_SECRET`         | Chave secreta usada para assinar os tokens JWT. Gere uma com: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `FRONTEND_URL`       | URL pela qual o usuário acessa o site (sem barra no final). Local: `http://localhost:3001` |
| `BACKEND_URL_PUBLIC` | URL pela qual o navegador acessa o backend (sem barra no final). Local: `http://localhost:3000` |

## 🚀 Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/siqueira2009/linkfolio.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd linkfolio
   ```
3. Crie o arquivo `.env` a partir do exemplo e preencha as variáveis (veja a seção acima):
   ```bash
   cp .env.example .env
   ```
4. Suba os containers:
   ```bash
   docker compose up -d
   ```
5. Acesse a aplicação:
   - Frontend: `http://localhost:3001`
   - Backend: `http://localhost:3000`

## 🐳 Serviços

| Serviço    | Imagem                                   | Porta  |
| ---------- | ----------------------------------------- | ------ |
| `backend`  | `siqueira2009/linkfolio-backend:v1.2`     | `3000` |
| `frontend` | `siqueira2009/linkfolio-frontend:v1.7`    | `3001` |

Os dados do usuário são persistidos em um volume Docker (`user-data`), evitando perda de informações ao recriar os containers.

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e uso pessoal. Sinta-se livre para utilizá-lo como referência.

## 👤 Autor

Desenvolvido por [Lucas Siqueira](https://www.linkedin.com/in/lucasdesouzasiqueira/).