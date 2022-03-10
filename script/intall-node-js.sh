#!/bin/bash

cd ~ || return

sudo apt update

sudo apt install curl

curl -sL https://deb.nodesource.com/setup_17.x -o ~/nodesource_setup.sh

sudo bash ~/nodesource_setup.sh

sudo apt-get install -y nodejs

sudo npm install -g npm
