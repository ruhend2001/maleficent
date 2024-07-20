FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  nodejs \
  python \
  ffmpeg \
  zip \
  git \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

RUN node index.js
