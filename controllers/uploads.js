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

    const name = await uploadFiles(req.files, undefined, collection)
    model.img = name


    await model.save()

    res.json({
        model
    })
}

module.exports = {
    uploadFile,
    uploadImageUser
}