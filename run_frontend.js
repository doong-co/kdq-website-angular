var static = require('node-static');

var fileServer = new static.Server('frontend/dist', { cache: 7200, gzip: true });

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err && (err.status === 404)) {
              fileServer.serveFile('/404.html', 404, {}, request, response);
            } else if (err) { // There was an error serving the file
                console.error("Error serving " + request.url + " - " + err.message);

                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(9000);