const { response } = require("express");
const { Category } = require("../models");

const createCategory = async(req, res = response) => {

    const name = req.body.name.toUpperCase()

    const categoriaDB = await Category.findOne({name})

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.name} ya existe`
        })
    }

    // Generar data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data)

    // Guardar DB

    await category.save()

    res.status(201).json(category)
}

module.exports = {
    createCategory
}