# Sistema de de gerenciamento de tarefas

> Este aplicativo de gerenciamento de tarefas permite aos usuários criar e gerenciar tarefas e registrar logs de horas trabalhadas.

## Table of contents

- [🧰 Funcionalidades específicas](#-funcionalidades-espec%C3%ADficas)
- [🚀 Tecnológias utilizadas](#-tecnol%C3%B3gias-utilizadas)
- [:computer: Pré-requisitos para instalação]()
- [:green_book: Instruções para instalação e migração do banco de dados](#instru%C3%A7%C3%B5es-para-instala%C3%A7%C3%A3o-e-migra%C3%A7%C3%A3o-do-banco-de-dados)
- [💡 Exemplo de uso](#exemplo-de-uso)
- [:floppy_disk: Visualização dos dados aramazenados no PostegreSql](#development-setup)
- [:spades: Autor](#release-history)

## 🧰 Funcionalidades específicas

[(Back to top)](#table-of-contents)

- Criação, listagem, atualização e exclusão de tarefas com os seguintes campos: título, descrição, data de vencimento.
- Conclusão de uma tarefa salvando a data/hora do encerramento.
- Registro das horas trabalhadas em uma tarefa, incluindo a data de realização, quantidade de horas e um comentário.
- Visualização de horas trabalhadas em uma tarefa específica.
- Geração de gráfico exibindo a quantidade de tarefas concluídas por dia.

## 🚀 Tecnológias utilizadas

[(Back to top)](#table-of-contents)

- [NestJS](https://nestjs.com/) - Na construção na API REST.
- [TypeORM](https://typeorm.io/) - Na integração com banco de dados PostgreSQL.
- [Angular14](https://angular.io/) e [Angular Material](https://material.angular.io/) - Na construção da interface de usuário.
- [PostgreSql](https://www.postgresql.org) - Na persistência de dados
- [Typescript](https://www.typescriptlang.org) - A linguagem principal utilizada na implementação das funcionalidades.
- [Docker](https://www.docker.com) - Na criação de containers de cada aplicação utilizada nesse projeto.
- [Docker-compose](https://docs.docker.com/compose/) - Orquestrador de containers utilizado para gerenciar todos os microserviços implementados.

## :computer: Pré-requisitos para instalação

[(Back to top)](#table-of-contents)

- Git
- Docker

## :green_book: Instruções para instalação e migração do banco de dados

[(Back to top)](#table-of-contents)

1. Abra seu terminal de execute o comando.

```bash
git clone https://github.com/FelipeAugusto1303/taskmanager.git
```

2. Acesse a pasta do projeto com o comando abaixo e execute o docker compose para construir os containers e rodar a aplicação

```bash
$ cd taskmanager
docker compose up -d --build
```

3. Espere a finalização da construção dos containers para a realização das migrações do banco de dados. :exclamation: :exclamation: :exclamation: Este é um passo importante para o correto funcionamento da aplicação. Vá até seu terminal e digite os comandos abaixo.

```bash
docker exec -it taskmanager_backend sh
```

O comando acima permite você acessar o container do backend da aplicação. Dentro do container execute os seguintes comandos.

```bash
'#' npm run build
npx typeorm migration:run -d dist/database/orm-cli-config.js
```

ao finalizar as migrações saia do container com o comando

```bash
exit
```

## 💡 Exemplo de uso

[(Back to top)](#table-of-contents)

1. Criação de tarefa
2. Atualização de tarefa
3. Listagem de tarefas
4. Exclusão de tarefa
5. Conclusão de tarefa
6. Registro de horas trabalhadas
7. Visualização de log de horas
8. Gráfico de tarefas concluídas por dia

## :floppy_disk: Visualização dos dados aramazenados no PostegreSql

[(Back to top)](#table-of-contents)

Um container do pgAdmin foi criado para visualizar os dados armazenados da aplicação, vá até seu navegar e acesse [localhost:8000](http://localhost:8000), ao acessar o link você será redirecionado para a pagina de login, para acessar utilize as credenciais abaixo.

> Email/Username: admin@admin.com <br>
> Password: admin

Ao acessar, clique no botão adicionar nova conexão para criar uma conexão com o banco de dado postgres:

1. Na primeira aba (General), coloque o nome da sua conexão
2. Na segunda aba (Conexão), coloque as seguintes informações:
   > Host name/ address: db <br>
   > Port: 5432 <br>
   > Maintence database: postgres <br>
   > Username: postgres <br>
   > Password: felipe1303

ao clicar em salvar a sua nova conexão aparecerá na coluna ao lado esquerdo, clique e acesse o database postgres para visualizar os dados.

## :spades: Autor

[(Back to top)](#table-of-contents)
