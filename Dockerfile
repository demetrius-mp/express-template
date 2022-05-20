FROM node:16.15.0-alpine

WORKDIR /app

COPY . .

RUN npm install -g npm@8.10.0

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "dev"]
