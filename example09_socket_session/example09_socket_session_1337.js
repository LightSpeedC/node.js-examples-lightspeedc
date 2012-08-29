/* use a function for the exact format desired... */  
function ISODateString(d) {
  function pad(n){return n<10 ? '0'+n : n}  
  return d.getUTCFullYear()+'-'  
      + pad(d.getUTCMonth()+1)+'-'  
      + pad(d.getUTCDate())+'T'  
      + pad(d.getUTCHours())+':'  
      + pad(d.getUTCMinutes())+':'  
      + pad(d.getUTCSeconds())+'Z'  
}  
function DateString(d) {
  function pad(n){return n<10 ? '0'+n : n}  
  return d.getFullYear()+'-'  
      + pad(d.getMonth()+1)+'-'  
      + pad(d.getDate())+' '  
      + pad(d.getHours())+':'  
      + pad(d.getMinutes())+':'  
      + pad(d.getSeconds())  
}  

var net = require('net');
net.Socket.prototype.date1 = null;
net.Socket.prototype.count1 = null;
var counter = 0;

var server = net.createServer(function (socket) {
  ++counter;
  socket.write('Echo server\r\n');
  socket.date1 = DateString(new Date());
  socket.count1 = counter;
  console.log(socket.date1+' '+socket.count1+' New Session');
  socket.write(socket.date1+' '+socket.count1+' New Session\r\n');
  socket.on('data', function(chunk) {
    console.log(socket.date1+' '+socket.count1+' data:'+chunk.toString());
    socket.write(socket.date1+' '+socket.count1+' data:'+chunk.toString()+'\r\n');
  });
  //socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');
console.log('telnet 127.0.0.1 1337');
