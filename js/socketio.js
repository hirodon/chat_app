$(function(){

        var socket = io.connect();

    socket.on("server_to_client", function(data){appendMsg(data.value)});

    function appendMsg(text) {
        $("#chatLogs").append("<div>" + text + "</div>");
    }

    $("#msg-form").submit(function(e){
        var message = $("#msgForm").val();
        $("#msgForm").val('');
        socket.emit("client_to_server", {value : message});
        //window.location.href = "?id=2&" + "name=" $('#lg_username').val() + "&" + "room=" + $('#room-select').val();
        e.preventDefault();
        return false;
    });
});



