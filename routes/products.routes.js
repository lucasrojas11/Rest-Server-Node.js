const { Router } = require('express');
const {check} = require('express-validator');
const { createProduct, 
        getProducts, 
        getProduct, 
        updateProduct,
        deleteProduct } = require('..//controllers/products.controllers');
const { createCategoty } = require('../controllers/categories.controllers');

const { existsCategoryById, existsProductById } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');



const router = Router();

//get all products - public
router.get('/', getProducts);

//get a product by id - public
router.get('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(existsProductById),
    validateFields,
], getProduct);

//Create a product - private - anyone with a valid token
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Not a valid id').isMongoId(),
    check('category').custom(existsCategoryById),
    validateFields
],createProduct);

//Update a record by id - private - anyone with a valid token
router.put('/:id', [
    validateJWT,
    // check('category', 'Not a valid id').isMongoId(),
    check('id').custom(existsProductById),
    validateFields
],updateProduct);

//delete a product by id - admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(existsProductById),
    validateFields
],deleteProduct);


module.exports = router;