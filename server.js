var express = require("express");// include pakage express
var app = express();
var server = require("http").Server(app);
var io =require("socket.io")(server);

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

server.listen(9000, function(){
	console.log('http://localhost:9000/');	
});

var mangUser = [];
io.on("connection", function(socket){
	console.log("co client " + socket.id + " ket noi");

	socket.on("client-send-Username", function(data){
		if (mangUser.indexOf(data) >= 0) {
			socket.emit("server-send-dky-thatbai");
		}
		else{
			mangUser.push(data);
			socket.Username = data;
			socket.emit("server-send-dky-thanhcong", data);
			io.sockets.emit("server-send-danhsach-users", mangUser);
		}
	});
	socket.on("logout", function(){
		mangUser.splice(
				mangUser.indexOf(socket.Username), 1
			);
		socket.broadcast.emit("server-send-danhsach-users", mangUser);
	});
	socket.on("user-send-message", function(data){
		io.sockets.emit("server-send-message", {un: socket.Username, nd: data});
	});
	socket.on("toi-dang-go-chu", function(){
		var load = socket.Username + " dang go chu";
		io.sockets.emit("ai-do-dang-go-chu", load);
	});
	socket.on("toi-ngung-go-chu", function(){
		io.sockets.emit("ai-do-ngung-go-chu");
	});
});
//html client
app.get("/", function(req, res){
    res.render("index");
});