const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, uploadImageUser } = require('../controllers/uploads');
const { validCollections } = require('../helpers');
const { validUploadFile } = require('../middlewares');

const { validFields } = require('../middlewares/valid-fields');

const router = Router();

router.post('/', validUploadFile, uploadFile)

router.put('/:collection/:id', [
    validUploadFile,
    check('id', 'The id not is Mongo').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validFields
], uploadImageUser)

module.exports = router;