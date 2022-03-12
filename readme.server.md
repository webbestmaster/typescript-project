### PM2
```bash
$ sudo npm i -g pm2 \
$ sudo pm2 start ./run-server.sh --name server // start process with name 'server' \
$ pm2 monit // show current state \
$ pm2 kill // kill 'em all!
```


#### ./run-server.sh
```bash
$ npm run front:build
$ npm run back:build
$ npm run back:start
```


### Nginx

Run
```bash
$ /usr/bin/nginx [-t] [-c ~/my-nginx.conf] [-g "daemon off;"]
```

`-t` - Don’t run, just test the configuration file. NGINX checks configuration for correct syntax and then try to open files referred in configuration.
`-c` - Specify which configuration file NGINX should use instead of the default.
`-g "daemon off;"` - do not exit from terminal

```bash
$ sudo nginx -s stop
```

```bash
$ sudo nginx -s reload
```

### Docker

Install docker
```bash
$ sudo apt-get install ca-certificates curl gnupg lsb-release
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Remove\uninstall docker
```bash
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```


Build
```bash
$ docker build -t project-name:0.0.1 .
```

`-t` - add project name

Run
```bash
$ docker run [-d] -p "8080:9090" project-name:0.0.1
```
Use key `-d` to exit from terminal without stop server\image

8080 - your local port to open app

9090 - server's port of app

Image list
```bash
$ docker image ls
```

Running images
```bash
$ docker ps
```

Stop image, get image name from `$ docker ps`
```bash
$ docker stop <CONTAINER ID>
```

Remove image
```bash
$ docker image rm -f <image id>
```


### How to download backup

Execute this from your local machine:

```bash
// download
$ scp deploy@188.166.70.236:~/<file-name>.zip ~/<file-name>.zip

// upload
$ scp /path/to/file username@servername/ip:/destination/folder/
```

### Watch

```bash
$ nohup watch -n 3600 ./make-db-dump.sh & // make back up every one hour
```
