FROM node:alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

EXPOSE 5435

COPY . .

CMD ["npm","start"]
