const { Router } = require('express');
const { usersGet, userPut, userPost, userDelete } = require('../controllers/user');

const router = Router();


router.get('/', usersGet);

router.post('/', userPost);

router.put('/', userPut);

router.delete('/', userDelete);



module.exports = router;