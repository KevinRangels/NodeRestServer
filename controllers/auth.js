const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //verficar si el correo existe

        const user = await User.findOne({ email })

        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password is incorrect - email'
            })
        }

        // verificar si el usuario esta activo

        if ( !user.state ) {
            return res.status(400).json({
                msg: 'User / Password is incorrect - estado: false'
            })
        }

        // verificar contraseña

        const validPassword = bcryptjs.compareSync( password, user.password )
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User / Password is incorrect - password'
            })     
        }

        // Generar JWT

        const token = await generateJWT( user.id )

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with admin'
        })
    }

    

}

const googleSignin = (req, res = response) => {

    let { id_token } = req.body

    res.json({
        msg: 'Todo bien',
        id_token
    })
}

module.exports = {
    login,
    googleSignin
}