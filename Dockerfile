FROM node:16

WORKDIR /tmp/build

COPY package*.json ./

RUN npm install

COPY . .

LABEL name "ServerSMP-BOT"
LABEL maintainer "Prince527 <prince527gaming@gmail.com>"

CMD ["node", "index.js"]
