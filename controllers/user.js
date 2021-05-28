const { response } = require('express');
const bcryptjs = require('bcryptjs'); 

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

    const { name, email, password, rol } = req.body;

    const user = new User({ name, email, password, rol });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await user.save();

    res.json({
        user
    })
}

const userPut = async(req, res = response) => {

    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body

    if (password) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest )

    res.json({
        user
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