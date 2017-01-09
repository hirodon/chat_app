$(function(){
	function(comment){
		var command = "";
		var value = "";
		if (comment[0] == "#") {
			for (var i = 0; comment.length < i; i++) {
				if (comment[i] != ":" || comment.length != i) {
					command += comment[i];
				}else{
					break;
				}
			}
			for(var i = command.length; comment.length < i;i++ ){
				value += comment[i];
			}
			console.log(command +':'+value);
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