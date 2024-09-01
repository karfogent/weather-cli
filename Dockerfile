FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
LABEL authors="karfogent"

ENTRYPOINT ["node", "weather.js"]