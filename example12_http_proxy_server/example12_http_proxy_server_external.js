// proxy_server_external.js

var svc_port = 8080;			// internal proxy server service port

var http = require('http');
var url = require('url');

http.createServer(function (req, resp) {

  url_parse = url.parse(req.url);

  var options = {
    host: url_parse.hostname,
    port: url_parse.port || 80,
    path: req.url
  };

  console.log('REQUEST: ', req.url);

  var fwd_req = http.request(options, function (fwd_resp) {
    //console.log('STATUS: ', fwd_resp.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(fwd_resp.headers));

    fwd_resp.on('data', function (chunk) {
      resp.write(chunk, 'binary');
    });
    
    fwd_resp.on('end', function () {
      resp.end();
    });

    fwd_resp.on('error', function (err) {
      console.log('fwd_resp Error:', err.message);
      console.log(err);
    });
    
    resp.writeHead(fwd_resp.statusCode, fwd_resp.headers);
  });
  
  fwd_req.on('error', function (err) {
    console.log('fwd_req Error:', err.message);
    console.log(err);
  });

  req.on('data', function (chunk) {
    fwd_req.write(chunk, 'binary');
  });
  
  req.on('end', function () {
    fwd_req.end();
  });
}).listen(svc_port);

console.log('Proxy server '+svc_port);
