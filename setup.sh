# Init
sudo apt-get update

# Install Nodejs V5
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo npm install -g grunt-cli
sudo npm install -g bower
sudo npm install -g sails
sudo npm install -g pm2

# Install Ruby and RVM
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties
sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev

gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3

curl -L https://get.rvm.io | bash -s stable

# source ~/.rvm/scripts/rvm
source /usr/local/rvm/scripts/rvm
# echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
echo "source /usr/local/rvm/scripts/rvm" >> ~/.bashrc
rvm install 2.1.2
rvm use 2.1.2 --default
ruby -v

# Install Compass
gem install compass
