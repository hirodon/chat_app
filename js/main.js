$(function(){

    $('#login-form').submit(function(){
        window.location.href = 'room.html?' + "id=" + $('#lg_username').val() + "&" + "room=" + $('#room-select').val();
        return false;
    })
});