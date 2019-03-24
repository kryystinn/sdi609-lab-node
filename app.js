// Módulos
var express = require('express');
var app = express();

var fileUpload = require('express-fileupload');
app.use(fileUpload());

var mongo = require('mongodb');
var swig = require('swig');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);


// Variables
app.set('port', 8081);
app.set('db','mongodb://admin:sdi@tiendamusica-shard-00-00-tqjmz.mongodb.net:27017,tiendamusica-shard-00-01-tqjmz.mongodb.net:27017,tiendamusica-shard-00-02-tqjmz.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true');

/**app.get('/usuarios', function(req, res) {
    res.send('ver usuarios');
})
app.get('/canciones', function(req, res) {
    res.send('ver canciones');
})
*/

//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, gestorBD); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, gestorBD); // (app, param1, param2, etc.)

// lanzar el servidor
app.listen(app.get('port'), function() {
    console.log("Servidor activo");
})