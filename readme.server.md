### PM2
> $ sudo npm i -g pm2 \
> $ sudo pm2 start ./run-server.sh --name server // start process with name 'server' \
> $ pm2 monit // show current state \
> $ pm2 kill // kill 'em all!


### Nginx

Run
```
$ /usr/bin/nginx [-t] [-c ~/my-nginx.conf] [-g "daemon off;"]
```

`-t` - Don’t run, just test the configuration file. NGINX checks configuration for correct syntax and then try to open files referred in configuration.
`-c` - Specify which configuration file NGINX should use instead of the default.
`-g "daemon off;"` - do not exit from terminal

```
$ sudo nginx -s stop
```

```
$ sudo nginx -s reload
```

### Docker

Build
```
$ docker build -t project-name:0.0.1 .
```

`-t` - add project name

Run
```
docker run [-d] -p "8080:9090" project-name:0.0.1
```
Use key `-d` to exit from terminal without stop server\image

8080 - your local port to open app

9090 - server's port of app

Image list
```
$ docker image ls
```

Running images
```
$ docker ps
```

Stop image, get image name from `$ docker ps`
```
$ docker stop <CONTAINER ID>
```

Remove image
```
$ docker image rm -f <image id>
```


### How to download backup

Execute this from your local machine:

```bash
// download
$ scp deploy@188.166.70.236:~/<file-name>.zip ~/<file-name>.zip

// upload
scp /path/to/file username@servername/ip:/destination/folder/
```

### Watch

```bash
$ nohup watch -n 3600 ./make-db-dump.sh & // make back up every one hour
```
