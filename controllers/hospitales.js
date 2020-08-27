const {response} = require('express');
const Hospital = require('../models/hospital');
const getHospitales = async(req, res) => {
	const hospitales = await Hospital.find()
	.populate('usuario','nombre')
	res.json({
		ok:true,
		hospitales
	});
}

const crearHospital = async(req, res = response) => {

	const uid = req.uid;
	const hospital = new Hospital({
		usuario:uid,
		...req.body
	});
	try {
		
		// Guardar Hospital
		const hospitalDB = await hospital.save();
		res.json({
			ok:true,
			Hospital:hospitalDB,
		});
		
	} catch (error) {

		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador'
		})
		
	}

}

const actualizarHospital = async(req, res = response) => {

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
const borrarHospital = async(req, res = response) => {
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
	getHospitales,
	crearHospital,
	actualizarHospital,
	borrarHospital



}