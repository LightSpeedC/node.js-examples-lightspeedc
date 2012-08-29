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
  socket.date1 = new Date();
  socket.count1 = counter;
  console.log(socket.count1+' '+DateString(socket.date1));
  socket.write(socket.count1+' '+DateString(socket.date1)+'\r\n');
  socket.on('data', function(chunk) {
    console.log(socket.count1+' '+chunk.toString()+' '+DateString(socket.date1));
    socket.write(socket.count1+' '+chunk.toString()+' '+DateString(socket.date1)+'\r\n');
  });
  socket.write('Echo server\r\n');
  //socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');
console.log('telnet 127.0.0.1 1337');

