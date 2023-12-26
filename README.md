# Sistema de de gerenciamento de tarefas

> Este aplicativo de gerenciamento de tarefas permite aos usuários criar e gerenciar tarefas e registrar logs de horas trabalhadas.

## Índice

- [🧰 Funcionalidades específicas](#-funcionalidades-espec%C3%ADficas)
- [🚀 Tecnologias utilizadas](#-tecnol%C3%B3gias-utilizadas)
- [:computer: Pré-requisitos para instalação](#computer-pr%C3%A9-requisitos-para-instala%C3%A7%C3%A3o)
- [:green_book: Instruções para instalação e migração do banco de dados](#green_book-instru%C3%A7%C3%B5es-para-instala%C3%A7%C3%A3o-e-migra%C3%A7%C3%A3o-do-banco-de-dados)
- [💡 Exemplo de uso](#-exemplo-de-uso)
- [:floppy_disk: Visualização dos dados armazenados no PostegreSql](#floppy_disk-visualiza%C3%A7%C3%A3o-dos-dados-aramazenados-no-postegresql)
- [:spades: Autor](#spades-autor)

## 🧰 Funcionalidades específicas

[(Back to top)](#%C3%ADndice)

- Criação, listagem, atualização e exclusão de tarefas com os seguintes campos: título, descrição, data de vencimento.
- Conclusão de uma tarefa salvando a data/hora do encerramento.
- Registro das horas trabalhadas em uma tarefa, incluindo a data de realização, quantidade de horas e um comentário.
- Visualização de horas trabalhadas em uma tarefa específica.
- Geração de gráfico exibindo a quantidade de tarefas concluídas por dia.

## 🚀 Tecnologias utilizadas

[(Back to top)](#%C3%ADndice)

- [NestJS](https://nestjs.com/) - Na construção na API REST.
- [TypeORM](https://typeorm.io/) - Na integração com banco de dados PostgreSQL.
- [Angular14](https://angular.io/) e [Angular Material](https://material.angular.io/) - Na construção da interface de usuário.
- [PostgreSql](https://www.postgresql.org) - Utilizado para persistir os dados da aplicação.
- [Typescript](https://www.typescriptlang.org) - A linguagem principal utilizada na implementação das funcionalidades.
- [Docker](https://www.docker.com) - Na criação de containers de cada aplicação utilizada nesse projeto.
- [Docker-compose](https://docs.docker.com/compose/) - Orquestrador de containers utilizado para gerenciar todos os microserviços implementados.

## :computer: Pré-requisitos para instalação

[(Back to top)](#%C3%ADndice)

- Git: Acesse o site oficial do [Git](https://git-scm.com), baixe e instale a versão mais atual para seu sistema operacional.
  Para verificar se o git foi instalado corretamente abra um terminal e digite o seguinte comando.

```bash
git -v
```

deve aparecer a versão do git instalada em seu computador.

- Docker: Acesse o site oficial do [Docker](), baixe e instale a versão mais atual para seu sistema operacional.
  Para verificar se o docker e o docker-compose estão funcionais em sua máquina, abra um terminal e digite os seguintes comandos.

```bash
docker -v
docker compose -h
```

O primeiro comando irá mostrar a versão do docker instalada em sua máquina e o segundo mostrará uma lista de opções para serem utilizadas com o docker-compose.

## :green_book: Instruções para instalação e migração do banco de dados

[(Back to top)](#%C3%ADndice)

1. Abra o terminal e execute o comando.

```bash
git clone https://github.com/FelipeAugusto1303/taskmanager.git
```

2. Para construir os containers e rodar a aplicação, acesse a pasta do projeto com o comando

```bash
$ cd taskmanager
```

e execute o comando

```bash
docker compose up -d --build
```

3. Espere a finalização da construção dos containers para a realização das migrações do banco de dados.<br>:exclamation: Este é um passo importante para correto funcionamento da aplicação. :exclamation: <br> Ao final, no terminal, digite o comando.

```bash
docker exec -it taskmanager_backend sh
```

Este comando permite acessar o container do backend da aplicação.
Dentro do container execute os seguintes comandos.

```bash
npm run build
npx typeorm migration:run -d dist/database/orm-cli-config.js
```

Ao finalizar as migrações, saia do container digitando o comando

```bash
exit
```

## 💡 Exemplo de uso

[(Back to top)](#%C3%ADndice)

1. Criação de tarefa
   ![Criação de tarefa](imagem1.png)
2. Atualização de tarefa
3. Listagem de tarefas
4. Exclusão de tarefa
5. Conclusão de tarefa
6. Registro de horas trabalhadas
7. Visualização de log de horas
8. Gráfico de tarefas concluídas por dia

## :floppy_disk: Visualização dos dados armazenados no PostegreSql

[(Back to top)](#%C3%ADndice)

Um container do pgAdmin foi criado para visualizar os dados armazenados da aplicação. Em um navegador acesse [localhost:8000](http://localhost:8000). A execução do link redireciona para a pagina de login. Para acessar, utilize as credenciais abaixo.

> Email/Username: admin@admin.com <br>
> Password: admin

Ao acessar, clique no botão adicionar nova conexão para criar uma conexão com o banco de dado postgres:

1. Na primeira aba (General), coloque o nome da conexão
2. Na segunda aba (Conexão), coloque as seguintes informações:
   > Host name/ address: db <br>
   > Port: 5432 <br>
   > Maintence database: postgres <br>
   > Username: postgres <br>
   > Password: felipe1303

Ao clicar em salvar, uma nova conexão aparecerá na coluna ao lado esquerdo. Clique e acesse o database postgres para visualizar os dados.

## :spades: Autor

[(Back to top)](#%C3%ADndice)
