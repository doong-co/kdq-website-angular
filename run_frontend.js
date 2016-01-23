var liveServer = require("live-server");

var params = {
    port: 8181, // Set the server port. Defaults to 8080.
    root: "./frontend/app", // Set root directory that's being server. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 1000 // Waits for all changes, before reloading. Defaults to 0 sec.
};

liveServer.start(params);