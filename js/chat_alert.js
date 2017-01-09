$(function(){
	function chat_alert(text){
		$('#chatLogs').append(
    		'<div class="chat-alert" >' +
	  		'<p>' + text + '</p>' +
			'</div>' 
    	);
	}
});