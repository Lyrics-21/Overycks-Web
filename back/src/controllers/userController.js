const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validacion = require('../utils/validacion');
const userModel = require('../models/userModels');

//Crear usuario (registro)
const createUser = async(req, res) =>
{
    try
    {
        const {name, email, password} = validacion.createUserSchema.parse(req.body);
        const usuarioExiste = await userModel.checkUser(name, email);
        if (usuarioExiste.length > 0)
        {
            return res.status(400).json({message : 'El usuario ya existe'});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await userModel.insertUser(name, email, hashPassword);
        res.status(201).json({status : 'success',
                              message : 'Usuario registrado con exito',
                              userId : result.insertId});
    }
    catch(error)
    {
        res.status(400).json({status : error,
                              message : 'Error al registrar el usuario',
                              error : error.message});
    }
};

//Iniciar sesion
const login = async(req, res) =>
{
    try
    {
        const {name, password} = req.body;
        const users = await userModel.findUser(name);
        if(users.length === 0)
        {
            return res.status(401).json({message : 'El usuario no existe'});
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
        {
            return res.status(401).json({message : 'Usuario y/o contraseña incorrectos'});
        }

        const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET, {expiresIn : '1h'});

        res.json({status : 'success',
                  message : 'Inicio de sesion exitoso',
                  token});
    }
    catch(error)
    {
        res.status(500).json({status: 'error',
                              message : 'Error al iniciar sesion',
                              error : error.message});
    }
}

//Eliminar usuario
const eliminarUsuario = async(req, res) =>
{
    try
    {
        const userId = req.params.userId;
        const result = await userModel.deleteUser(userId);

        if(result.affectedRows === 0)
        {
            return res.status(404).json({status : 'error',
                                         message : 'Usuario no encontrado'})
        }
        res.json({status : 'success',
                  message : 'Usuario eliminado con exito',
                  data : result})
    }
    catch(error)
    {
        res.status(500).json({status : 'error',
                              message : 'Error al iniciar sesion',
                              error : error.message});
    }
}

module.exports = {createUser, login : [validacion.loginRateLimiter, login], eliminarUsuario};