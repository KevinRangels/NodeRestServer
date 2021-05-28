const Role = require('../models/role');


const isRoleValid = async(rol = '') => {
    const existRol = await Role.findOne({ rol })
    if( !existRol ) {
        throw new Error(` This rol ${rol} not register in DB `)
    }
}

module.exports = {
    isRoleValid
}