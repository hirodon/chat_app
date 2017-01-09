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
    paramArray["name"] = decodeURI(paramArray["name"]);
    function bottom_scroll(){
        setTimeout(function() {
        $('.chat-area').scrollTop($('.chat-area').get(0).scrollHeight);
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
    bottom_scroll();
    $(window).on("beforeunload", function() {
        socket.json.emit('offline_client',{
            name : paramArray["name"],
            room : paramArray["room"]
        });
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
        command($('#msg').val());
        $('#msg').val('').focus();

        bottom_scroll();
    });
    socket.on('emit_from_server',function(data){
        $('#chatLogs').append(data.msg);
        command(data.comment);
        bottom_scroll();
    });
    socket.on("online", function (data) {
        //println("online id: " + obj.id);
        $('#chatLogs').append(data);
        bottom_scroll();
    });
    socket.on("offline", function (data) {
        //println("online id: " + obj.id);
        $('#chatLogs').append(data);
        bottom_scroll();
    });
    function chat_alert(text){
        $('#chatLogs').append(
            '<div class="chat-alert" >' +
            '<p>' + text + '</p>' +
            '</div>' 
        );
    }
    function command(comment){
        var comment_array = comment.split('');
        var command = "";
        var value = "";
        if (comment_array[0] == "#") {
            for (var i = 0; comment_array.length > i; i++) {
                if (comment_array[i] != ":" || comment_array.length != i) {
                    command += comment_array[i];
                }else{
                    break;
                }
            }
            command = command.split('');
            for(var i = command.length; comment_array.length > i;i++ ){
                value += comment_array[i];
            }
            value = value.split('');
            console.log(command +':'+value);
            console.log(comment_array[0]);
            switch(command){
                case "color":
                    $(".yourself-comment").css("color",value);
                break;
                case "background":
                    $("body").css("background",value);
                break;
                default:
                    chat_alert("読み込みに失敗しました。");
                break;
            }
        }
    } 
});



