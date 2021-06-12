const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/auth');
const { validFields } = require('../middlewares/valid-fields');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validFields
], login);

router.post('/google', [
    check('id_token', 'Id token is required').not().isEmpty(),
    validFields
], googleSignin);

module.exports = router;