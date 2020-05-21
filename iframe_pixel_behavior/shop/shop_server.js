const https = require('https');
const fs = require('fs');
var url_module = require('url');


const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, function (request, response) {

    const path = url_module.parse(request.url).pathname;
    const { method, url, headers } = request;

    if(path == '/') {
        response.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            response.write("This is Test Page.");
            response.end();
    }
    else if(method == 'POST') {
        console.log(method); console.log(url); console.log(headers); console.log(url_module.parse(request.url).query);console.log(request.host);
        response.writeHead(200, {
                'Content-Type': 'text/html'
            });
        response.end();
    }
    else {
        fs.readFile(__dirname + path, function(error, data) {
        if (error) {
            console.log(error);
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
        }
}).listen(8081);
