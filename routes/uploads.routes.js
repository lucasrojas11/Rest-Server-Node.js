const { Router } = require('express');
const {check} = require('express-validator');
const { uploadFiles, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads.controllers');
const { collectionsAllowed } = require('../helpers');

const { validateFields } = require('../middlewares/validate-fields');
const { validateFile } = require('../middlewares/validate-file');


const router = Router();

router.post('/', validateFile, uploadFiles)

router.put('/:colleccion/:id', [
    validateFile,
    check('id', 'Not a valid id').isMongoId(),
    check('colleccion').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validateFields
],//updateImage
updateImageCloudinary);

router.get('/:colleccion/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('colleccion').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validateFields
],showImage);


module.exports = router;