#!/bin/bash

apt update

curl -sL https://deb.nodesource.com/setup_18.x -o ./nodesource_setup.sh

bash ./nodesource_setup.sh

apt-get install -y nodejs

apt update

npm install -g npm

# TODO:
# apt update is needed only before installing packages with apt
# try to make like this
### begin
#   #!/bin/bash
#   curl -sL https://deb.nodesource.com/setup_17.x -o ./nodesource_setup.sh
#   bash ./nodesource_setup.sh
#   apt-get install -y nodejs
#   npm install -g npm
### end
