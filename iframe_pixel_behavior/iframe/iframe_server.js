const https = require('https');
const fs = require('fs');
var url = require('url');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, function (request, response) {
    //console.log(url.parse(request.url).query);

    var path = url.parse(request.url).pathname;
    fs.readFile(__dirname + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    response.write(data);
                    response.end();
                }
            });
}).listen(8082);
