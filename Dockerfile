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

RUN apt install -y fonts-liberation gconf-service libappindicator1 libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgbm-dev libgdk-pixbuf2.0-0 libgtk-3-0 libicu-dev libjpeg-dev libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libpng-dev libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 xdg-utils

RUN chmod 777 ./docker-start.sh

#CMD ./docker-start.sh
