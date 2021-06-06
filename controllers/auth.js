const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');

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
        res.json({
            msg: 'login ok'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with admin'
        })
    }

    

}

module.exports = {
    login
}