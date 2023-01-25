const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { loadFile } = require("..//helpers");

const { User, Product } = require('..//models/index');



const uploadFiles = async(req, res = response) => {

    //txt, md
    try {
        // const texts = await loadFile(req.files, ['txt', 'md'], 'texts');
        const imgs = await loadFile(req.files, undefined, 'imgs');
        // res.json({ texts });
        res.json({ imgs });
        
    } catch (msg) {
        res.status(400).json({ msg });
    }
} 

const updateImage = async (req, res = response) => { 

    const {id, colleccion} = req.params;


    let model;

    switch (colleccion) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'User not found'
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'Product not found'
                });
            }
            break;
    
        default:
            return res.status(500).json({msg: 'I forgetet to validate this'});
    }

    //cleanind up previous images
    try {
        if(model.img){
            //delete image from the server
            const pathImg = path.join(__dirname, '../uploads', colleccion, model.img);
            if( fs.existsSync( pathImg )){
                fs.unlinkSync( pathImg );
            }
        }
    } catch ( error ) {
        console.log( error );
    }


    const picture = await loadFile(req.files, undefined, colleccion);
    model.img = picture;

    await model.save();

    
    res.json(model);
}

const updateImageCloudinary = async (req, res = response) => { 

    const {id, colleccion} = req.params;


    let model;

    switch (colleccion) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'User not found'
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'Product not found'
                });
            }
            break;
    
        default:
            return res.status(500).json({msg: 'I forgetet to validate this'});
    }

    //cleanind up previous images
    try {
        if(model.img){
            const nameArr = model.img.split('/');
            const name = nameArr[ nameArr.length - 1 ];
            const [ public_id ] = name.split('.');
            cloudinary.uploader.destroy(public_id);
        }
    } catch ( error ) {
        res.status(400).json( {msg: 'Something went wrong!'} );
    }


    try {
        const { tempFilePath } = req.files.file;
        const { secure_url }= await cloudinary.uploader.upload(tempFilePath);

        model.img = secure_url;

        await model.save();
    } catch (error) {
        console.log(error);
    }

    
    res.json( model );
}

const showImage = async (req, res = response) => {

    const {id, colleccion}  = req.params;

    let model;

    switch (colleccion) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'User not found'
                });
            }
            break;
        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: 'Product not found'
                });
            }
            break;
    
        default:
            return res.status(500).json({msg: 'I forgetet to validate this'});
    }

    //cleanind up previous images
    try {
        if(model.img){
            //delete image from the server
            const pathImg = path.join(__dirname, '../uploads', colleccion, model.img);
            if( fs.existsSync( pathImg )){
                return res.sendFile( pathImg );
            }
        }
    } catch ( error ) {
        console.log( error );
    }

    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile( pathImg );


}


module.exports = {
    uploadFiles,
    updateImage,
    showImage,
    updateImageCloudinary
}