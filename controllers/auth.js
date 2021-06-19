const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const user = require("../models/user");

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

const googleSignin = async(req, res = response) => {

    let { id_token } = req.body

    try {

    const { email, name, img } = await googleVerify(id_token)

    let user = await User.findOne({email})

    if ( !user ) {
        // tengo que crearlo
        const data = {
            name,
            email,
            password: ':p',
            img,
            google: true
        }

        user = new User( data )
        await user.save()
    }

    // si el usuario en DB

    if ( !user.state ) {
        return res.status(401).json({
            msg: 'Unauthorized, user blocked'
        })
    }

    const token = await generateJWT( user.id )

        res.json({
            user,
            token
        })
        
    } catch (error) {
        res.json.status(400).json({
            msg: 'Token google not valid'
        })
    }

}

module.exports = {
    login,
    googleSignin
}