$(function(){
    var url   = location.href;
    var params    = url.split("?");
    var spparams   = params[1].split("&");
    var paramArray = [];
    for ( i = 0; i < spparams.length; i++ ) {
        vol = spparams[i].split("=");
        paramArray.push(vol[0]);
        paramArray[vol[0]] = vol[1];
    }
    function bottom_scroll(){
        setTimeout(function() {
        $('.chat-area').scroll(0,$('.chat-area').get(0).scrollHeight);
        console.log($('#chatLogs').height());
        console.log($('.chat-area').height())
        console.log($('.chat-area').get(0).scrollHeight);
        console.log($('#chatLogs').get(0).scrollHeight);
    },0);
    }
    var socket = io.connect();
    socket.json.emit('online_client',{
        name : paramArray["name"],
        room : paramArray["room"]
    });
    $('#chatLogs').append(
        '<div class="chat-alert" >' +
      '<p>Room' + paramArray["room"] + 'に入室しました。</p>' +
      '</div>' 
    );
    $(window).on("beforeunload", function() {
        socket.json.emit('offline_client',{
            name : paramArray["name"]
        });
        return "本当に遷移しちゃう？";
    });
    //emit イベントを発信している
    //on  イベントを待ち受けている
    $('#msg-form').submit(function(e){
        e.preventDefault();
        socket.json.emit('emit_from_client',{
            msg : $('#msg').val(),
            name : paramArray["name"],
            room : paramArray["room"]
        });
        $('#chatLogs').append(
            '<div  class="myself-chat">' +
            '<div class="myself-comment">' +
            '<p>'+ paramArray["name"] +'</p>' +
            '<span>'+ $('#msg').val() +'</span>' +
            '</div>' +
            '</div>'
        );
        $('#msg').val('').focus();
        // bottom_scroll();
    });
    socket.on('emit_from_server',function(data){
        $('#chatLogs').append(data);
        // bottom_scroll();
    });
    socket.on("online", function (data) {
        //println("online id: " + obj.id);
        $('#chatLogs').append(data);
        // bottom_scroll();
    });
    socket.on("offline", function (data) {
        //println("online id: " + obj.id);
        $('#chatLogs').append(data);
        // bottom_scroll();
    });
});



