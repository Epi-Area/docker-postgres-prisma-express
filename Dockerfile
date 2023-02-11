FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 7000

CMD npm start