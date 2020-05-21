var https = require('https');
var http = require('http');
var url_module = require('url');
var fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, function (request, response) {

    //console.log(request);
    var path = url_module.parse(request.url).pathname;
    const { method, url, headers } = request;
    console.log("\n\nPath: " + path); console.log("Method: " + method); console.log("url : " + url); console.log("headers : " + JSON.stringify(headers));
    console.log("query params : " + url_module.parse(request.url).query);

    if(path == '/pixel') {
        console.log("In pixel Redirect");
        // Simulating PPACA redirect for a pixel request.
       response.writeHead(302, {
        'Location': 'https://search.example:8080/.well-known/ad-click-attribution/25/26'
        });

        response.end();
    } else if ( path.includes("/.well-known/ad-click-attribution")){
        console.log("In wellknown endpoint");
        // .well-known endpoint request.
        response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Well-Known-Endpoint-Path': path
                });
        response.write("Well-Known Endpoint received : " + path);
        response.end();
    }
    else {
        console.log("Loading link page");
        fs.readFile(__dirname + '/link.html', function(error, data) {
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
    }
}).listen(443);
