const validJWT = require('../middlewares/validation-jwt');
const validRoles = require('../middlewares/valid-rol');
const validField = require('../middlewares/valid-fields');


module.exports = {
    ...validJWT,
    ...validRoles,
    ...validField
}