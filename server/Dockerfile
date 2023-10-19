FROM node

WORKDIR /MangaJozu/server

COPY package*.json ./

RUN npm install -g ts-node nodemon


COPY . .

ENV PORT=7000

EXPOSE 7000

CMD [ "npm", "run", "dev" ]