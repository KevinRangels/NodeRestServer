const { response } = require("express")

const isAdminRole = (req, res = response, next) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Verify rol and not first token'
        })
    }

    const { rol, name } = req.user

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not admin - no authorized role`
        })
    }

    next()
}

const hasRoles = ( ...roles ) => {

    return (req, res = response, next) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Verify rol and not first token'
            })
        }

        if ( !roles.includes(req.user.rol) ) {
            return res.status(401).json({
                msg: `The service require roles ${roles}`
            })
        }
    
        next()
    }

}

module.exports = {
    isAdminRole,
    hasRoles
}