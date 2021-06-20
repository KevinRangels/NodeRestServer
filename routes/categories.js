const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory } = require('../controllers/categories');
const { validJWT } = require('../middlewares');

const { validFields } = require('../middlewares/valid-fields');

const router = Router();


// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('get all')
})
// Obtener una  categoria por id - publico
router.get('/:id', (req, res) => {
    res.json('get - id')
})
// Crear categoria  - usuario logeado post
router.post('/', [
    validJWT,
    check('name', 'The name is required').not().isEmpty(),
    validFields
    ], createCategory )
// actualiza categoria  - usuario logeado put
router.put('/:id', (req, res) => {
    res.json('put')
})
// delete categoria  - usuario admin delete
router.delete('/:id', (req, res) => {
    res.json('delete')
})


module.exports = router;
