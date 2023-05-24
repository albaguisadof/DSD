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

/************************SENSORES*****************************/


const puppeteer = require('puppeteer');

async function obtenerTemperatura() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.google.com/search?q=tiempo+en+granada&oq=timepo+en+granda&aqs=chrome.1.69i57j0i10i131i433i512l3j0i10i512l5j0i10i131i433i512.3556j1j4&sourceid=chrome&ie=UTF-8');

  await page.waitForSelector('#wob_tm');
  const temperatura = await page.$eval('#wob_tm', element => element.textContent);

  await browser.close();

  return temperatura;
}

async function obtenerViento() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.google.com/search?q=tiempo+en+granada&oq=timepo+en+granda&aqs=chrome.1.69i57j0i10i131i433i512l3j0i10i512l5j0i10i131i433i512.3556j1j4&sourceid=chrome&ie=UTF-8');

  await page.waitForSelector('#wob_ws');
  const temperatura = await page.$eval('#wob_ws', element => element.textContent);

  await browser.close();

  //Extraer solo los valores numéricos
  var numero = temperatura.replace(/\D/g, '');

  return numero;
}

async function obtenerPrecipitaciones() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.google.com/search?q=tiempo+en+granada&oq=timepo+en+granda&aqs=chrome.1.69i57j0i10i131i433i512l3j0i10i512l5j0i10i131i433i512.3556j1j4&sourceid=chrome&ie=UTF-8');

  await page.waitForSelector('#wob_pp');
  const temperatura = await page.$eval('#wob_pp', element => element.textContent);

  await browser.close();

  //Extraer solo los valores numéricos
  var numero = temperatura.replace(/\D/g, '');

  return numero;
}

async function obtenerHumedad() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.google.com/search?q=tiempo+en+granada&oq=timepo+en+granda&aqs=chrome.1.69i57j0i10i131i433i512l3j0i10i512l5j0i10i131i433i512.3556j1j4&sourceid=chrome&ie=UTF-8');

  await page.waitForSelector('#wob_hm');
  const temperatura = await page.$eval('#wob_hm', element => element.textContent);

  await browser.close();

  //Extraer solo los valores numéricos
  var numero = temperatura.replace(/\D/g, '');

  return numero;
}

async function obtenerClima() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.google.com/search?q=tiempo+en+granada&oq=timepo+en+granda&aqs=chrome.1.69i57j0i10i131i433i512l3j0i10i512l5j0i10i131i433i512.3556j1j4&sourceid=chrome&ie=UTF-8');

  await page.waitForSelector('#wob_dc');
  const temperatura = await page.$eval('#wob_dc', element => element.textContent);

  await browser.close();

  return temperatura;
}

/**************************************************************************************************/

 //Variables de estado
 var luz = "Sin registrar";
 var temp = "Sin registrar";
 var vt = "Sin registrar";
 var precipt = "Sin registrar";
 var maxprecipt = 0;
 var maxViento = 0;
 var altaTemp = 30;
 var MAXTemp = 35;
 var MINTemp = 5;
 var bajaTemp = 10;
 var persiana = "Subida";
 var AC = "Apagado";
 var calefaccion = "Apagado";
 var ventana = "Cerrada";
 var alarma = "";
 var primeraVez = true;


  
  MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true }, function(err, db) {
	httpServer.listen(8080);
	var io = socketio(httpServer);

	var dbo = db.db("SistemaDomotico");
	var collection = dbo.collection("Datos");
  io.sockets.on('connection',
    function(client) {

      
      client.on('cargarDatos', function() {
        obtenerTemperatura()
          .then(temperatura => {
            if(temperatura != temp){
              //Almacenamos el nuevo valor
              var d = new Date();
              collection.insertOne({ temperatura , d}, {safe:true}, function(err, result) {});
              io.sockets.emit('actualizarSistema', { temperatura });
              temp = temperatura;

              //gestion de alarmas
              if(temp >= altaTemp){
                alarma = "Altas temperaturas. Se recomienda encender el aire";
                collection.insertOne({alarma, d}, {safe:true}, function(err, result) {});
                io.sockets.emit('alarma', {alarma});
              }

              if(temp >= MAXTemp && AC=="Apagado"){
                alarma = "Extremas temperaturas. Se encenderá el aire automáticamente";
                collection.insertOne({alarma, d}, {safe:true}, function(err, result) {});
                io.sockets.emit('alarma', {alarma});
                AC = "Encendido";
                collection.insertOne({AC:"Encendido", d}, {safe:true}, function(err, result) {});
                io.sockets.emit('actualizarSistema', {AC:"Encendido", d});
              }

              if(temp <= bajaTemp){
                alarma = "Bajas temperaturas. Se recomienda encender la calefacción";
                collection.insertOne({alarma, d}, {safe:true}, function(err, result) {});
                io.sockets.emit('alarma', {alarma});
              }

              if(temp <= MINTemp && calefaccion=="Apagado"){
                alarma = "Extremas temperaturas. Se encenderá la calefacción automáticamente";
                collection.insertOne({alarma, d}, {safe:true}, function(err, result) {});
                io.sockets.emit('alarma', {alarma});
                calefaccion = "Encendido";
                collection.insertOne({calefaccion:"Encendido", d}, {safe:true}, function(err, result) {});
                io.sockets.emit('actualizarSistema', {calefaccion:"Encendido", d});
              }

              }
            })
          .catch(error => {
            console.error('Error al obtener la temperatura: ' + error);
          });

          obtenerClima()
          .then(luminosidad => {
            if(luminosidad != luz){
              //Almacenamos el nuevo valor
              var d = new Date();
              collection.insertOne({ luminosidad , d}, {safe:true}, function(err, result) {});
              io.sockets.emit('actualizarSistema', { luminosidad });
              luz = luminosidad;

              //gestion de alarmas
              
              if(temp <= altaTemp && temp >= bajaTemp  &&(luminosidad === "Despejado" || luminosidad === "Soleado") && ventana == "Cerrada"){
                alarma = "Hace buena temperatura, abriremos las ventanas automáticamente";
                collection.insertOne({alarma, d}, {safe:true}, function(err, result) {});
                io.sockets.emit('alarma', {alarma,d});
                ventana = "Abierta";
                collection.insertOne({ventana:"Abierta", d}, {safe:true}, function(err, result) {});
                io.sockets.emit('actualizarSistema', {ventana:"Abierta", d});
              }

              if(temp >= MAXTemp  && (luminosidad === "Despejado" || luminosidad === "Soleado") && persiana == "Abierto"){
                alarma = "Hace demasiada temperatura, cerraremos las persianas automáticamente";
                collection.insertOne({alarma, d}, {safe:true}, function(err, result) {});
                io.sockets.emit('alarma', {alarma,d});
                persiana = "Cerrado";
                collection.insertOne({persiana:"Cerrado", d}, {safe:true}, function(err, result) {});
                io.sockets.emit('actualizarSistema', {persiana:"Cerrado", d});
              }

              }
            })
          .catch(error => {
            console.error('Error al obtener la temperatura: ' + error);
          });

          obtenerViento()
            .then(viento => {
              if(viento != vt){
                //Almacenamos el nuevo valor
                var d = new Date();
                collection.insertOne({ viento , d}, {safe:true}, function(err, result) {});
                io.sockets.emit('actualizarSistema', { viento });
                vt = viento;
  
                //gestion de alarmas  
                if(viento >= maxViento && ventana=="Abierta"){
                  alarma = "Mucho viento. Se cerrarán las ventanas automáticamente";
                  collection.insertOne({alarma, d}, {safe:true}, function(err, result) {});
                  io.sockets.emit('alarma', {alarma});
                  ventana = "Cerrada";
                  collection.insertOne({ventana:"Cerrada", d}, {safe:true}, function(err, result) {});
                  io.sockets.emit('actualizarSistema', {ventana:"Cerrada", d});
                }

                }
              })
            .catch(error => {
              console.error('Error al obtener la temperatura: ' + error);
            });

            obtenerPrecipitaciones()
            .then(precipitaciones => {
              if(precipitaciones != precipt){
                //Almacenamos el nuevo valor
                var d = new Date();
                collection.insertOne({ precipitaciones , d}, {safe:true}, function(err, result) {});
                io.sockets.emit('actualizarSistema', { precipitaciones });
                precipt = precipitaciones;
  
                //gestion de alarmas  
                if(precipitaciones >= maxprecipt && ventana=="Abierta"){
                  alarma = "Alta probabilidad de lluvia. Se cerrarán las ventanas automáticamente";
                  collection.insertOne({alarma, d}, {safe:true}, function(err, result) {});
                  io.sockets.emit('alarma', {alarma});
                  ventana = "Cerrada";
                  collection.insertOne({ventana:"Cerrada", d}, {safe:true}, function(err, result) {});
                  io.sockets.emit('actualizarSistema', {ventana:"Cerrada", d});
                }

                }
              })
            .catch(error => {
              console.error('Error al obtener la temperatura: ' + error);
            });

          //Si es la primera vez que cargamos los datos
          if(primeraVez){
            io.sockets.emit('actualizarSistema', { persiana });
            io.sockets.emit('actualizarSistema', { AC });
            io.sockets.emit('actualizarSistema', { calefaccion });
            io.sockets.emit('actualizarSistema', { ventana });
            primeraVez = false;
          }

      });


      client.on('addPersiana', function (data) {
        persiana = data['persiana'];
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizarSistema', data);
      });

      client.on('addAC', function (data) {
        AC = data['AC'];
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizarSistema', data);
      });   

      client.on('addCalefaccion', function (data) {
        calefaccion = data['calefaccion'];
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizarSistema', data);
      });   

      client.on('addVentana', function (data) {
        ventana = data['ventana'];
        collection.insertOne(data, {safe:true}, function(err, result) {});
        io.sockets.emit('actualizarSistema', data);
      });
  });
});


console.log("Servicio MongoDB iniciado");
