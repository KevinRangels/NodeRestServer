const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, createProduct, getProduct, updatedProduct, deleteProduct } = require('../controllers/products');
const { productIdExist, categoryIdExist } = require('../helpers/db-validators');

const { validJWT, isAdminRole } = require('../middlewares');

const { validFields } = require('../middlewares');

const router = Router();


router.get('/', getProducts)

router.get('/:id', [
    check('id', 'not valid Mongo id').isMongoId(),
    check('id').custom(productIdExist),
    validFields
], getProduct)

router.post('/', [
    validJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'The category is required').not().isEmpty(),
    check('category', 'category not valid id').isMongoId(),
    check('category').custom(categoryIdExist),
    validFields
    ], createProduct )

router.put('/:id', [
    validJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'The category is required').not().isEmpty(),
    check('category', 'category not valid id').isMongoId(),
    check('category').custom(categoryIdExist),
    check('id', 'not valid id').isMongoId(),
    check('id').custom(productIdExist),
    validFields
], updatedProduct)


router.delete('/:id', [
    validJWT,
    isAdminRole,
    check('id', 'not valid id').isMongoId(),
    check('id').custom(productIdExist),
    validFields
],deleteProduct)


module.exports = router;
