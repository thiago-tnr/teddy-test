# Teste Teddy - encurtar url

![Logo](logo.png)

**Crie url curtas com facilidade**

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
  - [Construído Com](#construído-com)
- [Início Rápido](#início-rápido)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Uso](#uso)
- [Boas práticas](#boas-práticas)
- [Licença](#licença)

## Sobre o Projeto

API RESTful desenvolvida em Node.js para criação de url curtas, com foco em boas práticas de desenvolvimento.

### Construído Com

- Docker
- Node.js
- Express.js
- Prisma
- Jest

## Início Rápido

Para iniciar a aplicação, siga as etapas abaixo.

### Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- Docker

### Instalação

1. **Clone o repositório:**

   ```bash
https://github.com/thiago-tnr/teddy-test      
```

2. **Navegue até o diretório do projeto e abra o mesmo com seu editor de preferência:**

   ```bash
   cd teddy-test
   ```

3. **Conceda permissão de execução ao script de inicialização (caso necessário), rode no terminal o comando:**

   ```bash
   chmod +x .docker/start.sh
   ```
## Uso

Agora que você configurou o projeto, pode iniciar a aplicação seguindo estas etapas:

1. **Execute o Docker Compose para iniciar o servidor e o banco de dados:**

   ```bash
   docker-compose up
   ```
   Isso iniciará a aplicação em segundo plano.

2. **Entre dentro do terminal do container para executar tudo em um ambiente isolado:**

   ```bash
   docker-compose exec app bash
   ```
   Se necessário rode o comando do Prisma:

   ```bash
   npx prisma migrate dev
   ```
3. **Inicie o servidor de desenvolvimento:**

   Não se esqueça de criar um arvquivo .env usando o .env.example

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3000`.

4. **configurando as variáveis:**

   Não se esqueça de configurar o variáveis com base no .env.example

## Funcionalidades

### Cadastro de automóveis (CRUD)

- **Cadastrar:** Encurtar nossa rota.
- **Atualizar:** Atualizar uma rota de destino.
- **Excluir:** Soft delete de uma rota.
- **Recuperar:** Obtém uma rota.
- **Listar:** Lista todas as rotas do mesmo usuário.

### Cadastro de Usuários (CRUD)

- **Cadastrar:** Registra um novo usuário.
- **Atualizar:** Atualiza um usuário cadastrado.
- **Excluir:** Remove um usuário cadastrado.
- **Recuperar:** Obtém um usuário cadastrado pelo seu identificador único.
- **Listar:** Lista os usuário cadastrados.

## Boas práticas:

- Clean Code: código limpo, legível e fácil de manter.
- Padronização: organização e consistência no código.
- Documentação: explicação clara das funcionalidades da API.
- Testes unitários: garantem a robustez da API.

## Licença

Distribuído sob a Licença MIT. Consulte `LICENSE` para obter mais informações.

```

Este é o README completo em português formatado para o GitHub. Certifique-se de personalizar as seções, URLs e informações de contato de acordo com o seu projeto específico. Você também pode adicionar seções adicionais, como "Recursos" ou "Agradecimentos", conforme necessário.
