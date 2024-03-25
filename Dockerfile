FROM node:18-alpine

WORKDIR /app

COPY public/ /app/public
COPY server/ /app/server
COPY src/ /app/src
COPY package*.json /app/
COPY sslcert/ /app/sslcert

RUN npm install

WORKDIR /app/server

RUN npm install

EXPOSE 443

WORKDIR /app

CMD ["npm", "start"] 