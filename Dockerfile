FROM node:20-alpine

WORKDIR /usr/src/ArtDelivery-API

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD npm run start:dev
