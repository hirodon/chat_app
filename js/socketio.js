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
    var socket = io.connect();
    // socket.on("server_to_client", function(data){appendMsg(data.value)});
    // function appendMsg(text) {
    //     $("#chatLogs").append("<div>" + text + "</div>");
    // }
    // $("#msg-form").submit(function(e){
    //     var message = $("#msg").val();
    //     $("#msg").val('');
    //     socket.emit("client_to_server", {value : message});
    //     //window.location.href = "?id=2&" + "name=" $('#lg_username').val() + "&" + "room=" + $('#room-select').val();
    //     e.preventDefault();
    //     //return false;
    // });

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
                    '</div>');
                $('#msg').val('').focus();
            });
            socket.on('emit_from_server',function(data){

                $('#chatLogs').append(data);
            });
});



