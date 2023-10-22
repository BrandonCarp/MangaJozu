FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install 

RUN npm install -g ts-node nodemon

COPY . .

ENV PORT=7000

EXPOSE 7000

CMD [ "npm", "run", "dev" ]


# docker push to push to cloud registry
# docker pull to pull from others docker container

# Docker Build
# docker build -t fireship/brandoncarpenter:1.0 .

# Docker Run
# docker run 09e25048d7c108f39ece84480563b6e2d79b2c7feccfc2882ce8f254c802e5bd

# docker run to have container available locally locally:container
# docker run -p 8080:7000 09e25048d7c108f39ece84480563b6e2d79b2c7feccfc2882ce8f254c802e5bd

# VOLUMES to persist files - dedicated folder on host machine

# Create volume
# docker volume create sharedMangaJozu

#  mount source sharedMangaJozu, target=/MangaJozu : needs work

# debugging
# 1 process per container else multiple containers
# DockerCompose : tool for running multiple docker containers at the same time