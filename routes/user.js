const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, userPut, userPost, userDelete } = require('../controllers/user');

const router = Router();


router.get('/', usersGet);

router.post('/', [
    check('email', 'Email is invalid').isEmail(),
], userPost);

router.put('/:id', userPut);

router.delete('/:id', userDelete);



module.exports = router;