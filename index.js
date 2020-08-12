// para variables de entorno
require('dotenv').config();
//express
const express = require('express');
// CORS
const  cors = require('cors');
//CONFIG DATABASE
const {dbConnection} = require('./database/config');
//Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

//llama la funcion BD
dbConnection();



//rutas
app.get('/', (req, resp) => {
	resp.json({
		ok:true,
		msg:'Hola'
	});
});


app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en puerto' + process.env.PORT);
});