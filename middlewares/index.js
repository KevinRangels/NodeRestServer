const validJWT = require('../middlewares/validation-jwt');
const validRoles = require('../middlewares/valid-rol');
const validField = require('../middlewares/valid-fields');
const validUploadFile = require('../middlewares/valid-file')


module.exports = {
    ...validJWT,
    ...validRoles,
    ...validField,
    ...validUploadFile
}