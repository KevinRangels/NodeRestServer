const { request, response } = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'not token'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById( uid )

        if ( !user ) {
            return res.status(401).json({
                msg: 'token no valido - user not exist in DB'
            }); 
        }

        // Verificar si el uid tiene estado en true

        if (!user.state) {
            return res.status(401).json({
                msg: 'token no valido - state false'
            }); 
        }



        req.user = user  // enviando  usuario logeado
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valid'
        })
    }



}

module.exports = {
    validJWT
}