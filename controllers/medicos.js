const {response} = require('express');
const Medico = require('../models/medico');
const getMedicos = async(req, res) => {
	const medicos = await Medico.find()
	.populate("usuario","nombre").populate("hospital","nombre")
	res.json({
		ok:true,
		medicos
	});
}

const crearMedico = async(req, res = response) => {

	const uid = req.uid;
	const medico = new Medico({
		usuario:uid,
		...req.body
	});
	
	try {
	
		
		// Guardar usuario
		const medicoDB = await medico.save();
		res.json({
			ok:true,
			medico:medicoDB,
		});
		
	} catch (error) {

		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador'
		})
		
	}

}

const actualizarMedico = async(req, res = response) => {

	const uid = req.params.id;
try {
	const usuarioDB = await Usuario.findById(uid);

	if(!usuarioDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe un usuario por  ese ID'
		});
	}
	
	//Actualizar
	// Aqui esta sacando  los campos q no quiere actualizar
	const {google,password,email, ...campos} = req.body;
	if(usuarioDB.email !== email){
		
		const existeEmail = await Usuario.findOne({email});
		if(existeEmail){
			return res.status(400).json({
				ok: false,
				msg: 'Ya existe un usuario con ese Email'
			});
		}
	}
	campos.email = email;
	const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});
	res.json({
		ok:true,
		usuario:usuarioActualizado
	});

	
} catch (error) {
	res.status(500).json({
		ok: false,
		msg: 'Error inesperado'
	});
}

}
const borrarMedico = async(req, res = response) => {
	const uid = req.params.id;
	
	try {
		const usuarioDB = await Usuario.findById(uid);

	if(!usuarioDB){
		return res.status(404).json({
			ok: false,
			msg:'No existe un usuario por  ese ID'
		});
	}
	await Usuario.findByIdAndDelete(uid);
	res.json({
		ok: true,
		msg: 'Usuario eliminado'
	});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error inesperado'
		});
	}
	
}


module.exports = {
	getMedicos,
	crearMedico,
	actualizarMedico,
	borrarMedico
}