FROM node:current-buster-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

ENV PORT=3000

CMD [ "npm", "start" ]