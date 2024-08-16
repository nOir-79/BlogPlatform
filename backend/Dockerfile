FROM node:19-alpine

COPY ./package.json /app/

WORKDIR /app

RUN npm install

COPY . /app

EXPOSE 8000

CMD ["node" ,"index.js"]