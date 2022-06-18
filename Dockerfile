# FROM node:14.4.0-stretch
FROM ubuntu:20.04
WORKDIR /usr/app/
COPY ./ ./

RUN chmod 777 ./script/install-all.sh
RUN ./script/install-all.sh

RUN rm -rf ./node_modules
RUN npm install
RUN npm run front:build
RUN npm run back:build
RUN npm install pm2 -g

RUN chmod 777 ./docker-start.sh

CMD ./docker-start.sh
