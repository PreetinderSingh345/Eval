FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
RUN apt-get update && apt-get install -y postgresql-client

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
