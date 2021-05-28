const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { usersGet, userPut, userPost, userDelete } = require('../controllers/user');
const { validFields } = require('../middlewares/valid-fields');

const router = Router();


router.get('/', usersGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required, more than 6 letters').isLength({min: 6}),
    check('email', 'Email is invalid').isEmail(),
    // check('rol', 'Rol not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( async(rol = '') => {
        const existRol = await Role.findOne({ rol })
        if( !existRol ) {
            throw new Error(` This rol ${rol} not register in DB `)
        }
    }), 
    validFields
], userPost);

router.put('/:id', userPut);

router.delete('/:id', userDelete);



module.exports = router;