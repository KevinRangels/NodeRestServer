const { Category } = require('../models');
const Role = require('../models/role');
const User = require('../models/user');


const isRoleValid = async(rol = '') => {
    const existRol = await Role.findOne({ rol })
    if( !existRol ) {
        throw new Error(` This rol ${rol} not register in DB `)
    }
}

const emailExist = async(email = '') => {
    const existEmail = await User.findOne({ email })
    if ( existEmail ) {
        throw new Error(` This email ${email} exist in DB `)
    }
}

const userIdExist = async(id) => {
    const existUserId = await User.findById(id)
    if ( !existUserId ) {
        throw new Error(` This id ${id} not exist in DB `)
    }
}

/**
 * Categories
 */
const categoryIdExist = async(id) => {
    const existCategoryId = await Category.findById(id)
    if (!existCategoryId) {
        throw new Error(`This id ${id} not exist in DB`)
    }
}


/**
 * Exports
 */
module.exports = {
    isRoleValid,
    emailExist,
    userIdExist,
    categoryIdExist
}