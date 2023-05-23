var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var socketio = require("socket.io");
const { Collection } = require("mongodb");

var MongoClient = require('mongodb').MongoClient;
var MongoServer = require('mongodb').Server;
var mimeTypes = { "html": "text/html", "jpeg": "image/jpeg", "jpg": "image/jpeg", "png": "image/png", "js": "text/javascript", "css": "text/css", "swf": "application/x-shockwave-flash"};

var httpServer = http.createServer(
	function(request, response) {
		var uri = url.parse(request.url).pathname;
		if (uri=="/") uri = "/cliente.html";
		var fname = path.join(process.cwd(), uri);
		fs.exists(fname, function(exists) {
			if (exists) {
				fs.readFile(fname, function(err, data){
					if (!err) {
						var extension = path.extname(fname).split(".")[1];
						var mimeType = mimeTypes[extension];
						response.writeHead(200, mimeType);
						response.write(data);
						response.end();
					}
					else {
						response.writeHead(200, {"Content-Type": "text/plain"});
						response.write('Error de lectura en el fichero: '+uri);
						response.end();
					}
				});
			}
			else{
				console.log("Peticion invalida: "+uri);
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.write('404 Not Found\n');
				response.end();
			}
		});
	}
);

  
  MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true }, function(err, db) {
	httpServer.listen(8080);
	var io = socketio(httpServer);

	var dbo = db.db("SistemaDomotico");
	var collection = dbo.collection("Datos");
  io.sockets.on('connection',
    function(client) {

      client.on('addTemperatura', function (data) {
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizar', data);
      });

      client.on('addLuminosidad', function (data) {
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizar', data);
      });

      client.on('addPersiana', function (data) {
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizar', data);
      });

      client.on('addAC', function (data) {
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizar', data);
      });

      client.on('addMAXTemperatura', function (data) {
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizar', data);
      });

      client.on('addMINTemperatura', function (data) {
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizar', data);
      });

      client.on('addMAXLuminosidad', function (data) {
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizar', data);
      });

      client.on('addAlarma', function (data) {
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizar', data);
      });

    
  });
});


console.log("Servicio MongoDB iniciado");
