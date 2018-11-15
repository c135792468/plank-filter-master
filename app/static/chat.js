import socket from './show-multiple-users.js'

$(document).ready(function() {
	var socket = io.connect('http://127.0.0.1:5000');
	socket.on('message', function(msg) {
		$("#messages").append('<li>'+msg+'</li>');
	});
	$('#sendbutton').on('click', function() {
		socket.send($('#name').val() + $('#myMessage').val());
		$('#myMessage').val('');
	});
});
