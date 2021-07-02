const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { uploadFiles } = require('../helpers');
const { User, Product } = require("../models");

const uploadFile = async(req, res = response) => {

    try {
        // const name = await uploadFiles(req.files, ['txt', 'md'], 'texts')
        const name = await uploadFiles(req.files, undefined, 'imgs')
        res.json({
            name
        })
    } catch (msg) {
        res.status(400).json({msg})
    }

}

const uploadImageUser = async(req, res = response) => {
    
    const { collection, id } = req.params

    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Not exist user with id ${id}`
                })
            }
        break;

        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Not exist product with id ${id}`
                })
            }
        break;
    
        default:
            return res.status(500).json({msg: 'falta validar esto'});
    }


    // Limpiar imagenes previas
    if ( model.img) {
        // borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', collection, model.img)
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
        }
    }

    const name = await uploadFiles(req.files, undefined, collection)
    model.img = name


    await model.save()

    res.json({
        model
    })
}


const uploadImageCloudinary = async(req, res = response) => {
    
    const { collection, id } = req.params

    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Not exist user with id ${id}`
                })
            }
        break;

        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Not exist product with id ${id}`
                })
            }
        break;
    
        default:
            return res.status(500).json({msg: 'falta validar esto'});
    }


    // Limpiar imagenes previas
    if ( model.img) {
        // borrar la imagen
        const nameArr = model.img.split('/')
        const name = nameArr[nameArr.length - 1 ]
        const [ public_id ] = name.split('.')
        cloudinary.uploader.destroy( public_id )
        
    }

    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )

    model.img = secure_url

    await model.save()

    res.json({
        model
    })
}


const showImage = async(req, res = response) => {

    const { collection, id } = req.params

    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Not exist user with id ${id}`
                })
            }
        break;

        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Not exist product with id ${id}`
                })
            }
        break;
    
        default:
            return res.status(500).json({msg: 'falta validar esto'});
    }


    // Limpiar imagenes previas
    if ( model.img) {
        // borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', collection, model.img)
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }

    const pathImageDefault = path.join(__dirname, '../assets/no-image.jpg')

    return res.sendFile(pathImageDefault)

}

module.exports = {
    uploadFile,
    uploadImageUser,
    showImage,
    uploadImageCloudinary
}