const { response } = require("express");
const { ObjectId } = require('mongoose').Types
const { User, Category, Product } = require('../models')

const collectionPermited = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUser = async(termino = '', res = response) => {

    const isMongoID = ObjectId.isValid(termino)  //true

    if (isMongoID) {
        const user = await User.findById(termino)
        return res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp( termino, 'i' )

    // const users = await User.find({
    //     $or:[{name: regex}, {email: regex}],
    //     $and: [{state: true}]
    // })

    // const total = await User.count({
    //     $or:[{name: regex}, {email: regex}],
    //     $and: [{state: true}]
    // })

    const [total, users] = await Promise.all([
        User.count({
            $or:[{name: regex}, {email: regex}],
            $and: [{state: true}]
        }),
        User.find({
            $or:[{name: regex}, {email: regex}],
            $and: [{state: true}]
        })
    ]);

    res.json({
        total: total,
        results: users
    })
}

const searchCategory = async(termino = '', res = response) => {

    const isMongoID = ObjectId.isValid(termino)  //true

    if (isMongoID) {
        const category = await Category.findById(termino)
        return res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp( termino, 'i' )


    const [total, categoreis] = await Promise.all([
        Category.count({name: regex, state: true}),
        Category.find({name: regex, state: true})
    ]);

    res.json({
        total: total,
        results: categoreis
    })
}


const searchProduct = async(termino = '', res = response) => {

    const isMongoID = ObjectId.isValid(termino)  //true

    if (isMongoID) {
        const product = await Product.findById(termino).populate('category','name')
        return res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp( termino, 'i' )


    const [total, products] = await Promise.all([
        Product.count({name: regex, state: true}),
        Product.find({name: regex, state: true}).populate('category','name')
    ]);

    res.json({
        total: total,
        results: products
    })
}


const search = (req, res = response) => {

    
    const { collection, termn } = req.params
    
    if (!collectionPermited.includes(collection)) {
        return res.status(400).json({
            msg: `The collections permited is: ${collectionPermited}`
        })
    }

    switch (collection) {
        case 'users':
            searchUser(termn, res)
        break;

        case 'categories':
            searchCategory(termn, res)
        break;

        case 'products':
            searchProduct(termn, res)
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }

}

module.exports = {
    search
}