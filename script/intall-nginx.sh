#!/bin/bash

cd ~ || return

sudo apt update

sudo apt install -y --no-install-recommends nginx
