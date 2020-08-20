//express
const express = require('express');
// para variables de entorno
require('dotenv').config();

// CORS
const  cors = require('cors');
//CONFIG DATABASE
const {dbConnection} = require('./database/config');
//Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura BODY PARSE
app.use(express.json());

//llama la funcion BD
dbConnection();



//rutas
app.use('/api/usuarios', require('./routes/usuario'));

app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en puerto' + process.env.PORT);
});