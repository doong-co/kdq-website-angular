# Init
sudo apt-get update

# Install Nodejs V5
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo npm install -g grunt-cli
sudo npm install -g bower
sudo npm install -g live-server
sudo npm install -g sails
sudo npm install -g pm2

export NODE_PATH=/usr/lib/node_modules

(cd ./frontend && npm install)
(cd ./frontend && bower install)
