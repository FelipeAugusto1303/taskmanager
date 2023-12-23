# Use a imagem oficial do Node.js
FROM node:14-alpine as build

# Defina o diretório de trabalho no contêiner
WORKDIR /app/frontend

# Copie os arquivos de configuração e dependências do projeto
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos do projeto para o contêiner
COPY . .

# Construa o projeto Angular
RUN npm run build

# Use uma imagem leve do servidor da web para servir o aplicativo Angular
FROM nginx:alpine

# Copie os arquivos de build do Angular para o diretório de publicação do servidor da web
COPY --from=build /app/frontend/dist/* /usr/share/nginx/html/

# Exponha a porta 80 para o mundo exterior
EXPOSE 80

# Comando para iniciar o servidor da web
CMD ["nginx", "-g", "daemon off;"]