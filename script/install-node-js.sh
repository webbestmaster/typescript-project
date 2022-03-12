#!/bin/bash

apt update

curl -sL https://deb.nodesource.com/setup_17.x -o ./nodesource_setup.sh

bash ./nodesource_setup.sh

apt-get install -y nodejs

apt update

npm install -g npm
