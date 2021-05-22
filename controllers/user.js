const { response } = require('express');

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

const userPost =  (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - Controller',
        nombre,
        edad
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