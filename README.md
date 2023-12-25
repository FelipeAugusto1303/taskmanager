# Sistema de de gerenciamento de tarefas

> Este aplicativo de gerenciamento de tarefas permite aos usuários criar e gerenciar tarefas e registrar logs de horas trabalhadas.

## Table of contents

- [Funcionalidades específicas](#funcionalidades-específicas)
- [Tecnologias empregadas](#tecnologias-empregadas)
- [Instalação](#instalação)
- [Exemplo de Uso](#exemplo-de-uso)
- [Development Setup](#development-setup)
- [Release History](#release-history)
- [Meta](#meta)
- [Contributing](#contributing)

## 🧰 Funcionalidades específicas

[(Back to top)](#table-of-contents)

- Criação, listagem, atualização e exclusão de tarefas com os seguintes campos: título, descrição, data de vencimento.
- Conclusão de uma tarefa salvando a data/hora do encerramento.
- Registro das horas trabalhadas em uma tarefa, incluindo a data de realização, quantidade de horas e um comentário.
- Visualização de horas trabalhadas em uma tarefa específica.
- Geração de gráfico exibindo a quantidade de tarefas concluídas por dia.

## 🚀 Tecnológias utilizadas

- [NestJS](https://nestjs.com/) - Na construção na API REST.
- [TypeORM](https://typeorm.io/) - Na integração com banco de dados PostgreSQL.
- [Angular14](https://angular.io/) e [Angular Material](https://material.angular.io/) - Na construção da interface de usuário.
- postgres
- typescript
- docker

## Pré-requisitos para instalação

- Git
- Docker

## Instruções para instalação e migração do banco de dados

1. Abra seu terminal de execute o comando.

```bash
git clone https://github.com/FelipeAugusto1303/taskmanager.git
```

2. Acesse a pasta do projeto com o comando abaixo e execute o docker para construir os containers

```bash
cd taskmanager
docker-compose up -d --build
```

3. Espere a finalização da construção dos containers para a realização das migrações do banco de dados. Este é um passo importante para o correto funcionamento da aplicação.
   Vá até seu terminal e digite os comandos abaixo.

```bash
docker exec -it taskmanager_backend sh
```

O comando acima permite você acessar o container do backend da aplicação. Dentro do container execute os seguintes comandos.

```bash
npm run build
npx typeorm migration:run -d dist/database/orm-cli-config.js
```

ao finalizar as migrações saia do container com o comando

```bash
exit
```

## 💡 Exemplo de uso

1. Criação de tarefa
2. Atualização de tarefa
3. Listagem de tarefas
4. Exclusão de tarefa
5. Conclusão de tarefa
6. Registro de horas trabalhadas
7. Visualização de log de horas
8. Gráfico de tarefas concluídas por dia

## Visualização dos dados aramazenados no PostegreSql

## Autor
