// http_client.js

var options = {
  host: 'graph.facebook.com',
  port: 80,
  path: '/kazuaki.nishizawa',
};

var http = require('http');
var util = require('util');

console.log('OPTIONS:');
console.log(util.inspect(options, showHidden=false, depth=null, color=true));
console.log();

http.get(options, function(resp) {
  console.log('STATUS: ' + resp.statusCode);
  console.log();

  //console.log('HEADERS: ' + JSON.stringify(resp.headers));
  console.log('HEADERS: ');
  console.log(util.inspect(resp.headers, showHidden=false, depth=null, color=true));
  console.log();

  resp.setEncoding('utf8');

  resp.on('data', function (chunk) {
    console.log('BODY: data chunk legth='+chunk.length);
    console.log(chunk);

    // 全dataが1回で取得できている前提
    var graph = eval('('+chunk+')');
    console.log();
    console.log('GRAPH:');
    console.log(util.inspect(graph, showHidden=false, depth=null, color=true));
    console.log();

    console.log('JSON:');
    console.log(JSON.stringify(graph));
    console.log();

  });

  resp.on('end', function () {
    console.log('END:');
  });
});
