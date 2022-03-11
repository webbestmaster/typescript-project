# FROM node:14.4.0-stretch
FROM ubuntu:20.04
WORKDIR /usr/app/
COPY ./ ./

# RUN rm -rf ./node_modules
# RUN npm install && npm run build

# RUN apt-get update && apt-get install -y --no-install-recommends nginx

# CMD ["nginx", "-c", "/usr/app/nginx/nginx.docker.conf", "-g", "daemon off;"]
