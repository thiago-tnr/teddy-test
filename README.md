# Teste Houer - inscriçao em vaga

![Logo](logo.png)

**Gerencie Usuários e Vagas de Emprego com Facilidade**

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
- [Licença](#licença)

## Sobre o Projeto

API RESTful desenvolvida em Node.js para gerenciamento de despesas, com foco em segurança e boas práticas de desenvolvimento.

### Construído Com

- Docker
- Node.js
- Express.js
- Prisma
- Jest
- JWT (Tokens JSON Web)

## Início Rápido

Para iniciar a aplicação, siga as etapas abaixo.

### Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- Docker

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/thiago-tnr/onfly
      ```

2. **Navegue até o diretório do projeto e abra o mesmo com seu editor de preferência:**

   ```bash
   cd onfly
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

4. **configurando o DB:**

   Não se esqueça de configurar o DB com base no .env.example usando a variável abaixo

   ```bash
   JWT_SECRET_KEY
   REFRESH_JWT_SEC
   EMAIL_PASSWORD
   ```
## Funcionalidades


- Autenticação de usuário: garante acesso restrito à API através de token JWT.

- CRUD de despesas:

- Criação: registre novas despesas com validação de dados (data, valor, descrição).

- Leitura: visualize todas as suas despesas ou busque por filtros específicos.

- Atualização: edite informações das suas despesas (descrição, valor).

- Exclusão: remova despesas que não precisa mais.

- Validação de dados:

- Usuário existente: garante que o usuário da despesa está cadastrado.

- Data válida: impede o registro de despesas com data futura.

- Valor positivo: garante valores de despesa consistentes.

- Descrição concisa: limita o tamanho da descrição a 191 caracteres.

- Restrição de acessos:

- Somente o usuário dono da despesa pode realizar CRUD.

- Protege contra acessos indevidos e alterações em dados de outros usuários.

- Notificação por email:

- Envia email para o usuário ao cadastrar uma despesa.

- Informa o título "Despesa cadastrada".

## Boas práticas:


- Clean Code: código limpo, legível e fácil de manter.

- Padronização: organização e consistência no código.

- Documentação: explicação clara das funcionalidades da API.

- Testes unitários: garantem a robustez da API.

## Benefícios:


- Segurança na gestão de despesas.

- Validação de dados garante confiabilidade.

- Controle de acesso individualizado.

- Notificação instantânea de novas despesas.

- Código de alta qualidade e fácil de manter.

## Licença

Distribuído sob a Licença MIT. Consulte `LICENSE` para obter mais informações.

```

Este é o README completo em português formatado para o GitHub. Certifique-se de personalizar as seções, URLs e informações de contato de acordo com o seu projeto específico. Você também pode adicionar seções adicionais, como "Recursos" ou "Agradecimentos", conforme necessário.
