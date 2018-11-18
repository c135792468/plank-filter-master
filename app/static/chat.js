import socket from './show-multiple-users.js'

$(document).ready(function() {
	socket.on('message', function(msg) {
		$("#messages").append('<li>'+msg+'</li>');
	});
	$('#sendbutton').on('click', function() {
		socket.send("myname:" + $('#myMessage').val());
		$('#myMessage').val('');
	});
});