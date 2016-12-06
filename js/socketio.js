    var socket = io.connect();

    socket.on("server_to_client", function(data){appendMsg(data.value)});

    function appendMsg(text) {
        $("#chatLogs").append("<div>" + text + "</div>");
    }

    $("form").submit(function(e){
        var message = $("#msgForm").val();
        $("#msgForm").val('');
        socket.emit("client_to_server", {value : message});
        e.preventDefault();
    });