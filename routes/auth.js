/*

Ruta: /api/login

*/

const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validator-fields');
const router = Router();
router.post('/',
	[
		check('email','El Email es obligatorio').isEmail(),
		check('password','La Clave es obligatoria').not().isEmpty(),
		validarCampos
	],
	login
);
module.exports = router;