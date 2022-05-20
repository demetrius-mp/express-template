# Backend

## Configuração do runtime

Ambiente de execução: [NodeJS](https://nodejs.org/en/about/) v16.15.0 (Recomendado usar [NVM](https://github.com/nvm-sh/nvm) caso você já tenha uma versão do Node instalada)

Gerenciador de pacotes: NPM v8.10.0.

## Dependências externas

É necessária uma string de conexão com um banco de dados PostgreSQL v14.3.
Para o ambiente de desenvolvimento, é recomendada a utilização de um container PostgreSQL no [Docker](https://hub.docker.com/_/postgres).
Outra alternativa para utilizar o PostgreSQL tem instalar nada localmente, é criar um projeto no [Heroku](https://devcenter.heroku.com/articles/heroku-postgresql) com um banco PostgreSQL, e utilizar a string fornecida por eles.

## Variáveis de ambiente

`DATABASE_URL`: string de conexão com o banco de dados seguindo o formato exigido pelo [Prisma](https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-url).

`JWT_SECRET_KEY`: chave secreta gerada aleatóriamente utilizada para gerar JWT's. Caso esteja utilizando um ambiente Linux, é possível gerar uma string aleatória de 32 dígitos hexadecimais com o seguinte comando:

```
openssl rand -hex 32
```

`JWT_EXPIRES_IN`: tempo de duração do JWT em segundos ou uma string no formato [zeit/ms](https://github.com/vercel/ms).

`JWT_ALGORITHM`: algoritmo para criptografar o JWT. [Opções disponíveis](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported).

`PORT`: porta utilizada para o servidor.

`SECURITY_UP`: indica se a autenticação está ativada. Caso esteja desativada, toda requisição estará autenticada com um usuário coringa.

## Ambientes de desenvolvimento e produção

Após definir as variáveis de ambiente e clonar o repositório, execute o seguinte comando para instalar as dependências:

```
npm i
```

### Ambiente de desenvolvimento

#### Configurando variáveis de ambiente

Crie um arquivo na raíz do repositório, chamado `.env`, e copie o conteúdo do arquivo `.env.example` nesse arquivo, e preencha os valores das variáveis de acordo com a descrição fornecida na seção **Variáveis de ambiente**.

#### Scripts

Para executar as migrações no banco de dados, utilize o seguinte comando:

```
npx prisma migrate dev
```

Para popular o banco de dados com _dummy data_ utilize o seguinte comando:

```
npx prisma db seed
```

PS.: Os dados estão disponíveis em `prisma/seed.ts`

Para iniciar o servidor de desenvolzvimento, utilize o seguinte comando:

```
npm run dev
```

### Ambiente docker (necessário conhecimento básico de networks no docker compose)

#### Configurando variáveis de ambiente

As variáveis de ambiente utilizadas serão as que estão declaradas no arquivo `.env.docker`.

Atenção ao definir o valor da variável `DATABASE_URL`: O host da URL deve ser o **nome do serviço** declarado no arquivos `docker-compose.yml`.

Ex.: No arquivo `docker-compose.yml` foi utilizado o nome `banco_de_dados` como nome do serviço do PostgreSQL. Logo, o valor da variável `DATABASE_URL` deve ser: `postgresql://postgres:postgres@banco_de_dados:5432/saude_bucal_backend?schema=public`. Entenda [redes no docker compose](https://docs.docker.com/compose/networking/).

#### Scripts

Para iniciar o servidor utilizando docker, utilize o seguinte comando:

```
npm run docker
```

PS.: Caso você não tenha o NPM instalado no seu ambiente utilize o seguintes comando:

Para iniciar o servidor:

```
docker compose --env-file .env.docker up
```

### Ambiente de produção

#### Configurando variáveis de ambiente

Você pode utilizar o arquivo `.env` para gerenciar as variáveis de ambiente no ambiente de produção, porém não é recomendado. Verifique em seu serviço de hospedagem como é feita configuração de variáveis de ambiente.

#### Scripts

Para executar as migrações no banco de dados, utilize o seguinte comando:

```
npx prisma migrate deploy
```

Para compilar o projeto, utilize o seguinte comando:

```
npm run build
```

PS.: Os arquivos compilados ficam no diretório `build/`

Para executar o projeto compilado, utilize o seguinte comando:

```
npm run start
```

PS.: Caso você esteja utilizando Heroku para realizar o deploy da aplicação (seja para um ambiente de homologação ou de produção), basta configurar as variáveis de ambiente, e _pushar_ o código para o Heroku. Os scripts NPM estão configurados utilizando _pre_ e _post_ hooks de tal forma que os scripts de _build_ e _start_ sejam executados corretamente. Um `Procfile` também é disponibilizado no repositório para facilitar o _deploy_ no Heroku.

## Estrutura do código fonte

Todo o código de desenvolvimento da API está em `src/`.
Em prol de uma melhor organização do código, existe a seguinte estrutura de diretórios:

### Routers

- `routers/`: contém os arquivos de rotas da API.
- `routers/index.ts`: exporta um router que acopla os routers de recursos específicos. Neste arquivo, você deve **apenas** importar os routers de recursos específicos, sem incluir nenhum middleware.
- `routers/{resource}.router.ts`: define as rotas de um recurso. Ex.: `routers/user.router.ts`, abriga as rotas disponíveis para o recurso _user_. Neste arquivo você apenas deve incluir middlewares caso eles sejam utilizados _router level_, ou seja, o middleware será aplicado em todas as rotas. O _Request Handler_ não deve ser definido aqui.

### Validators

- `validators/`: contém os arquivos de validação de dados da _request_.
- `validators/common.validator.ts`: contém validações reaproveitáveis em mais de um modelo. Ex.: Validar que existe um campo `id` nos parâmetros da _request_
- `validators/{model}.validator.ts`: contém as validações de dados de um modelo. Ex.: `validators/user.validator.ts`, abriga as validações de dados disponíveis para o modelo _user_, tal como validação de email, tamanho da senha, entre outros.

### Services

- `services/`: contém os arquivos de serviços (código reaproveitável).
- `services/index.ts`: exporta os serviços disponíveis.
- `services/{service}.service.ts`: Define um serviço como uma classe. Ex.: `services/auth.service.ts`, abriga e export a classe `AuthService`, responsável por implementar os serviços de autenticação.

### Middlewares

- `middlewares/`: contém os arquivos de middlewares.
- `middlewares/index.ts`: exporta os middlewares disponíveis.
- `middlewares/{name}.middlewares.ts`: implementa um middleware. Exporta uma função que retorna um middleware. Ex.: `middlewares/auth.middleware.ts`, export uma função que nao recebe nenhum parâmetro, e retorna uma função (que é o middleware) que verifica se existe um usuário autenticado, e o acopla na _request_.

### Controllers

- `controllers/`: contém os _controllers_ da aplicação. O controller deve ser responsável por implementar as regras de negócios.
- `controllers/{resource}.controller.ts`: contém o _controller_ de um determinado recurso. O nome de um _router_ e de um _controller_ para esse _router_ devem ser o mesmo. Ex.: Um _router_ `routers/user.routers.ts` deve ter seu _controller_ com nome `controllers/user.controller.ts`. O controller de uma rota deve ser exportado como uma constante que armazena um array, e neste array estão incluidos os middlewares necessários para este endpoint, e a função que implementa a regra de negócios. Ex.: `controllers/user.controller.ts`, possui um _request handler_ chamado `create`. Para executar esta função, é necessário que o usuário esteja autenticado, portanto o controller deve incluir o middleware `authMiddleware`, ficando da seguinte forma...:

```typescript
const handleCreate = [authMiddleware(), create] as RequestHandler[];
```

- ...continuando. É necessário o typecasting (`as RequestHandler[]`) para que o TypeScript não reclame sobre o tipo do _request handler_.

### Lib

- `lib/`: contém arquivos que não se encaixam em nenhum dos diretórios acima. Idealmente, cada arquivo desse diretório deve, idealmente, conter apenas um `export default`.

Para encontrar mais exemplos de como implementar alguma funcionalidade, ou para entender melhor a estrutura e organização do projeto, explore pelo menos um arquivo de cada diretório.

## Usuários de VSCode

É recomendada a utilização do [VSCode](https://code.visualstudio.com/) para desenvolver.
As configurações recomendadas para esse projeto estão presentes em `.vscode/`. Recomendações de extensões, além de configurações do editor como associação de arquivos, e _code actions_. Ao abrir o projeto, o VSCode irá detectar automaticamente as recomendações e sugeri-las para você.

## Guia de estilo

Foi utilizado como base o guia de estilo `airbnb-base`. O mesmo foi adaptado para o projeto, com algumas modificações.

Para fazer _linting_ do código, utilize o seguinte comando:

```
npm run lint
```

Para formatar o código, e corrigir erros encontrados pelo _linter_, utilize o seguinte comando:

```
npm run lint:fix
```

## Futuro

- Utilizar algum _pattern_ (UseCases, Services, Repositories, entre outros) para realizar operações de CRUD, ao invés de realizar nos controllers diretamente.
- Implementar _validators_ para validação de dados.
- Testes automatizados.
- Sistema de CI/CD.
- Documentar a API utilizando _Swagger UI_.
