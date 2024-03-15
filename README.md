# Teste Seidor - uso de veículo

![Logo](logo.png)

**Gerencie Usuários, Carros e Uso de Carros com Facilidade**

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
  - [Construído Com](#construído-com)
- [Início Rápido](#início-rápido)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Uso](#uso)
- [Rotas e Autenticação](#rotas-e-autenticação)
- [Boas práticas](#boas-práticas)
- [Benefícios](#benefícios)
- [Observação](#observação)
- [Licença](#licença)

## Sobre o Projeto

API RESTful desenvolvida em Node.js para gerenciamento de uso de carro, com foco em boas práticas de desenvolvimento.

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
https://github.com/thiago-tnr/car-usage
      ```

2. **Navegue até o diretório do projeto e abra o mesmo com seu editor de preferência:**

   ```bash
   cd car-usage
   ```

3. **Conceda permissão de execução ao script de inicialização, rode no terminal o comando:**

   ```bash
   chmod +x .docker/start.sh
   ```
## Uso

Agora que você configurou o projeto, pode iniciar a aplicação seguindo estas etapas:

1. **Execute o Docker Compose para iniciar o servidor e o banco de dados:**

   ```bash
   docker-compose up -d
   ```

   Isso iniciará a aplicação em segundo plano.

2. **Entre dentro do terminal do container para executar tudo em um ambiente isolado:**

   ```bash
   docker-compose exec app bash
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

# Nome do Projeto

Descrição breve do projeto.

## Funcionalidades

### Cadastro de automóveis (CRUD)

- **Cadastrar:** Registra um novo automóvel.
- **Atualizar:** Atualiza um automóvel cadastrado.
- **Excluir:** Remove um automóvel cadastrado.
- **Recuperar:** Obtém um automóvel cadastrado pelo seu identificador único.
- **Listar:** Lista os automóveis cadastrados, com a opção de filtrar por cor e marca.

### Cadastro de motoristas (CRUD)

- **Cadastrar:** Registra um novo motorista.
- **Atualizar:** Atualiza um motorista cadastrado.
- **Excluir:** Remove um motorista cadastrado.
- **Recuperar:** Obtém um motorista cadastrado pelo seu identificador único.
- **Listar:** Lista os motoristas cadastrados, com a opção de filtrar por nome.

### Utilização de um automóvel

- **Criar registro de utilização:** Representa a utilização de um automóvel por um motorista, com uma data de início e um texto do motivo de utilização.
- **Finalizar utilização:** Finaliza a utilização de um automóvel por um motorista, guardando a data de finalização.
- **Listar registros de utilização:** Lista os registros de utilização cadastrados no sistema com o nome do motorista e as informações do automóvel utilizado.

### Controle de recursos

- **Automóvel:**
  - Placa
  - Cor
  - Marca
- **Motorista:**
  - Nome
- **Utilização do automóvel:**
  - Data de início da utilização
  - Data de término da utilização
  - Motorista que utilizou
  - Automóvel utilizado
  - Motivo de utilização

### Regras de negócio

- Um automóvel só pode ser utilizado por um motorista por vez.
- Um motorista que já esteja utilizando um automóvel não pode utilizar outro automóvel ao mesmo tempo.

## Boas práticas:

- Clean Code: código limpo, legível e fácil de manter.
- Padronização: organização e consistência no código.
- Documentação: explicação clara das funcionalidades da API.
- Testes unitários: garantem a robustez da API.

## Benefícios:

- Segurança na gestão de carros.
- Validação de dados garante confiabilidade.
- Controle de acesso individualizado.
- Código de alta qualidade e fácil de manter.

## Observação

- Para facilitar os testes do código implementado a key de envio de email do gmail está sendo enviado no .env.example

## Licença

Distribuído sob a Licença MIT. Consulte `LICENSE` para obter mais informações.

```

Este é o README completo em português formatado para o GitHub. Certifique-se de personalizar as seções, URLs e informações de contato de acordo com o seu projeto específico. Você também pode adicionar seções adicionais, como "Recursos" ou "Agradecimentos", conforme necessário.
