const { Router } = require('express');
const {check} = require('express-validator');
const { createCategoty, 
        getCategories, 
        getCategory, 
        updateCategory,
        deleteCategory } = require('../controllers/categories.controllers');
const { existsCategoryById } = require('../helpers/db-validators');

const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');



const router = Router();

//get all categories - public
router.get('/', getCategories);

//get a category by id - public
router.get('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFields,
], getCategory);

//Create a category - private - anyone with a valid token
router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields
],createCategoty);

//Update a record by id - private - anyone with a valid token
router.put('/:id', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(existsCategoryById),
    validateFields
],updateCategory);

//delete a category by id - admin
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(existsCategoryById),
    validateFields
],deleteCategory);


module.exports = router;