(cd ./frontend && sudo npm install)
(cd ./frontend && sudo bower install --allow-root)
(cd ./frontend && grunt build)

npm install

pm2 stop all

pm2 start server_prod.js