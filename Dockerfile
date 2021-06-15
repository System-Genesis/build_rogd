FROM node:13.12-alpine

WORKDIR /usr/src/app

COPY ['package.json', 'package-lock.json*', './']
RUN npm install --production=false --silent
COPY . .

RUN npm run build
RUN npm start

EXPOSE 9000
