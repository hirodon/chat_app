$(function(){

    $('#login-form').submit(function(){
        window.location.href = "?id=2&" + "name=" $('#lg_username').val() + "&" + "room=" + $('#room-select').val();
        return false;
    })
});