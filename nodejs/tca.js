var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');
app.listen(25494);
function handler(req,res){
    fs.readFile(__dirname + '/index.html',function(err,data){
        if (err) {
            res.writeHead(500);
            return res.end('Error');
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}
io.sockets.on('connection',function(socket){
    socket.on('emit_from_client',function(data){
        socket.join(data.room);
        //socket.emit('emit_from_server','you are in ' + data.room);
        socket.broadcast.to(data.room).emit('emit_from_server','[' + socket.client_name + ']: ' + data.msg);
        socket.client_name = data.name;
        //io.sockets.emit('emit_from_server','[' + socket.client_name + ']: ' + data.msg)
       // console.log(data);
       //接続しているソケットのみ
       socket.emit('emit_from_server','[' + socket.client_name + ']: ' + data.msg);
       //接続しているソケット以外全部
       //socket.broadcast.emit('emit_from_server','hello from srver: ' + data);
       //接続しているソケット全部
       //io.sockets.emit('emit_from_server','[' + socket.id + ']: ' + data);
    });
});
