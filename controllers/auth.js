const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const login = async(req, res = response) => {

	const {email,password} = req.body;
	
	try {
		const usuarioDB = await Usuario.findOne({email});
		//verificar Email
		if(!usuarioDB){
			return res.status(404).json({
				ok:false,
				msg:"Email no es valido "
			});
		}
		//verificar clave
		const validPassword = bcryptjs.compareSync(password,usuarioDB.password);
		if(!validPassword){
			return res.status(400).json({
				ok:false,
				msg:"Clave no es valido "
			});
		}
		
		// Generar un TOKEN
		const token = await generarJWT(usuarioDB.id);
		res.json({
			ok:true,
			token
		});
		
	} catch (error) {

		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		})
		
	}

}

module.exports = {
	login
}