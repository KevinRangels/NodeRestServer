const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategory, getCategories, updatedCategory, deleteCategory } = require('../controllers/categories');
const { categoryIdExist } = require('../helpers/db-validators');
const { validJWT, isAdminRole } = require('../middlewares');

const { validFields } = require('../middlewares');

const router = Router();


router.get('/', getCategories)

router.get('/:id', [
    check('id', 'not valid Mongo id').isMongoId(),
    check('id').custom(categoryIdExist),
    validFields
], getCategory)

router.post('/', [
    validJWT,
    check('name', 'The name is required').not().isEmpty(),
    validFields
    ], createCategory )

router.put('/:id', [
    validJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('id', 'not valid id').isMongoId(),
    check('id').custom(categoryIdExist),
    validFields
], updatedCategory)


// delete Category  - Only User Admin
router.delete('/:id', [
    validJWT,
    isAdminRole,
    check('id', 'not valid id').isMongoId(),
    check('id').custom(categoryIdExist),
    validFields
],deleteCategory)


module.exports = router;
