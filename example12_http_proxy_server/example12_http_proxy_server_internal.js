// proxy_server_internal.js

var svc_port = 8000;			// internal proxy server service port
var fwd_port = 8080;			// external proxy server port
var fwd_host = "192.168.251.10";	// external proxy server IP address

var http = require('http');
//var url = require('url');
var util = require('util');

http.createServer(function (req, resp) {
  //url_parse = url.parse(req.url);
  //url_parse = url.parse(req.url, false, true);
  //console.log('req:', util.inspect(req, showHidden=false, depth=2, color=true));
  //console.log('URL:', util.inspect(url_parse, showHidden=false, depth=null, color=true));

  var options = {
    host: fwd_host,
    port: fwd_port,
    path: req.url, //url_parse.path
    method: req.method,
    headers: req.headers
  };

  console.log('REQ:', req.method, req.url);
  //console.log('OPT:', JSON.stringify(options));

  var fwd_req = http.request(options, function (fwd_resp) {
    //console.log('STS:', fwd_resp.statusCode);
    //console.log('HDR:', JSON.stringify(fwd_resp.headers));

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

console.log('Proxy server '+svc_port+' -> '+fwd_host+':'+fwd_port);
