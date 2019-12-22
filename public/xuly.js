var socket = io("http://localhost:9000");

socket.on("server-send-dky-thatbai", function(){
	alert("Username da ton tai");
});

socket.on("server-send-dky-thanhcong", function(data){
	$("#currentUser").html(data);
	$("#loginForm").hide(2000);
	$("#chatForm").show(1000);
});

socket.on("server-send-danhsach-users", function(data){
	$("#boxContent").html("");
	data.forEach(function(i){
		$("#boxContent").append("<div>" + i +"</div>");
	});
});
socket.on("server-send-message", function(data){
	$("#listMessages").append("<div>" + data.un + " : " + data.nd + "</div>");
});
socket.on("ai-do-dang-go-chu", function(data){
	$("#info").html("<img width='50px' src = 'chat.gif'>" + data);
});
socket.on("ai-do-ngung-go-chu", function(){
	$("#info").html("");
});

$(document).ready(function(){
	$("#loginForm").show();
	$("#chatForm").hide();

	$("#btnRegister").click(function(){
		socket.emit("client-send-Username", $("#txtUsername").val());
	});
	$("#btnLogout").click(function(){
		socket.emit("logout");
		$("#loginForm").show(2000);
		$("#chatForm").hide(1000);
	});
	$("#btnSendMessage").click(function(){
		socket.emit("user-send-message", $("#txtMessage").val());
	});
	$("#txtMessage").focusin(function(){
		socket.emit("toi-dang-go-chu");
	});
	$("#txtMessage").focusout(function(){
		socket.emit("toi-ngung-go-chu");
	});
});