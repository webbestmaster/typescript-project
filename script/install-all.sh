#!/bin/bash

sudo apt update

sudo apt install curl

bash ./install-node-js.sh

bash ./install-mongo-db.sh

bash ./install-nginx.sh
