var app = require('http').createServer(handler),
io = require('socket.io').listen(app),
fs = require('fs'),
url = require('url'),
qs = require('querystring');
//app.listen(25494);//学校のサーバーの時
app.listen(80);//自分のサーバーの時
function handler(req,res){
  var req_url = req.url;
  console.log(req_url);
  if(req.method=='GET'){
        // tojson
    var param_json = url.parse(req.url, true).query;
    console.log(param_json);

        // querystring
        //var hoge = url.parse(req.url).query;

    if(param_json.id == 1){
      console.log("id=1");
      fs.readFile(__dirname +'/top.html', 'UTF-8', function(err, data){
        if (err) {
          res.writeHead(500);
          return res.end('Error');
        }
        res.writeHead(200);
        res.write(data);
        res.end();
      });
    }else if(param_json.id == '2'){
      console.log("id=2");
      fs.readFile(__dirname + '/room.html',function(err,data){
        if (err) {
          res.writeHead(500);
          return res.end('Error');
        }
        res.writeHead(200);
        res.write(data);
        res.end();
      });
    }
    console.log("pg end");
  }
  if ('./css/style.css' == req_url) {
    fs.readFile('./css/style.css', 'UTF-8', function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }
  // fs.readFile(__dirname + '/index.html',function(err,data){
  //   if (err) {
  //     res.writeHead(500);
  //     return res.end('Error');
  //   }
  //   res.writeHead(200);
  //   res.write(data);
  //   res.end();
  // });
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
