FROM node:20-alpine

WORKDIR /usr/src/ArtDelivery-API

ARG ENV_FILE_PATH
ENV ENV_FILE_PATH=${ENV_FILE_PATH}

COPY package*.json ./

COPY ${ENV_FILE_PATH} .env.prod

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD npm run start
