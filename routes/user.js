const { Router } = require('express');
const { check } = require('express-validator');

const { validFields } = require('../middlewares/valid-fields');
const { isRoleValid, emailExist, userIdExist } = require('../helpers/db-validators');

const { usersGet, userPut, userPost, userDelete } = require('../controllers/user');

const router = Router();


router.get('/', usersGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required, more than 6 letters').isLength({min: 6}),
    check('email', 'Email is invalid').isEmail(),
    check('rol').custom( isRoleValid ),
    check('email').custom(emailExist), 
    validFields
], userPost);

router.put('/:id',[
    check('id', 'not valid id').isMongoId(),
    check('id').custom(userIdExist),
    check('rol').custom( isRoleValid ),
    validFields
], userPut);

router.delete('/:id', [
    check('id', 'not valid id').isMongoId(),
    check('id').custom(userIdExist),
    validFields
], userDelete);



module.exports = router;