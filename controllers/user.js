const { response } = require('express');

const usersGet = (req, res = response) => {
    res.json({
        msg: 'get API - Controller'
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
    res.json({
        msg: 'put API - Controller'
    });
}

const userDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controller'
    })
}

module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete
}