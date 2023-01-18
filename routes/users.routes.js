const { Router } = require('express');
const {check} = require('express-validator');


const {validateFields} = require('..//middlewares/validate-fields');
const { isValidRole, isValidEmail, isValidId } = require('../helpers/db-validators');

const { getUsers, 
        postUsers,
        putUsers,
        patchUsers,
        deleteUsers,
} = require('..//controllers/users.controller');

const router = Router();

router.get('/', getUsers);

router.put('/:id',[
        check('id', 'Is not a valid id').isMongoId(),
        check('id').custom(isValidId),
        check('role').custom(isValidRole),
        validateFields
], putUsers);

router.post('/',[
        check('email', 'The email is not valid').isEmail(),
        check('email').custom(isValidEmail),
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required and must have 6 characters').not().isEmpty().isLength({min:6}),
        // check('role', "It's not a valid role").isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(isValidRole),
        validateFields  
], postUsers);


router.patch('/', patchUsers );

router.delete('/:id', [
        check('id', 'Is not a valid id').isMongoId(),
        check('id').custom(isValidId),
        validateFields
], deleteUsers);


module.exports = router;