FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "start"]
