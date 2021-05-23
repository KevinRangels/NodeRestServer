const { response } = require('express');
const bcryptjs = require('bcryptjs'); 
const { validationResult } = require('express-validator');
const User = require('../models/user');

const usersGet = (req, res = response) => {

    // Example -> /api/users?q=hola1&nombre=fernando

    const {q, nombre, page = 'null'} = req.query;

    res.json({
        msg: 'get API - Controller',
        q,
        nombre,
        page
    });
}

const userPost =  async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    const { name, email, password, rol } = req.body;

    const user = new User({ name, email, password, rol });

    // Verificar si  existe el correo
    const existEmail = await User.findOne({ email })
    if ( existEmail ) {
        return res.status(400).json({
            msg: 'This email exist'
        })
    }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await user.save();

    res.json({
        user
    })
}

const userPut = (req, res = response) => {

    const { id } = req.params
    res.json({
        msg: 'put API - Controller',
        id
    });
}

const userDelete = (req, res) => {

    const { id } = req.params
    res.json({
        msg: 'delete API - Controller',
        id
    })
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete
}