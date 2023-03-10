const { Router } = require('express');
const {check} = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { loggin, googleSignIn } = require('../controllers/auth.controllers');


const router = Router();

router.post('/login',[
    check('email',"El email es obligatorio").isEmail(),
    check('password',`EL password es obligatorion`).not().isEmpty(),
    validateFields
], loggin);

router.post('/google',[
    check('id_token',"The Google token is required").not().isEmail(),
    validateFields
], googleSignIn);


module.exports = router;