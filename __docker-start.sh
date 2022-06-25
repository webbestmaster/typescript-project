#!/bin/bash

pm2 start "npm run back:start"

nginx -c /usr/app/nginx/nginx.docker.conf -g "daemon off;"
