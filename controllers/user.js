const { response } = require('express');
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

    const body = req.body;

    const user = new User(body);

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