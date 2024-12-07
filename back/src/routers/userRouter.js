const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

//Ruta registro
router.post('/registro', userController.createUser);
//Ruta Inicio de sesion
router.post('/login', userController.login);
//Ruta eliminar usuario
router.delete('/eliminar/:userId', auth.authenticationToken, userController.eliminarUsuario);

module.exports = router; 