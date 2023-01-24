const { response } = require('express');
const { Product } = require('../models');


const getProducts = async(req, res = response) => {

    try {
        
        const {limit = 5, from = 0} = req.query;
        const query = {estado: true}

        const [ total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(Number(from))
                .limit(Number(limit))
        ])

        res.json({
            total,
            products
        }); 

    } catch (error) {
        res.status(400).json({
            msg: 'Something went wrong'
        })
    }

}


const createProduct = async(req, res = response) => {

    try {
        
        const { estado, user, ...body} = req.body;

        const productDB = await Product.findOne({ name: body.name });

        if(productDB){
            return res.status(400).json({
                msg: `The product ${productDB.name}, already exists`
            });
        }

        //Generate the data to be saved
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id,
        }

        const product = new Product(data);

        //Save in DB
        await product.save();

        res.status(201).json(product);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Something went wrong'
        })
    }
}

const getProduct = async(req, res = response) => {

    const { id } = req.params;
    const product = await Product.findById(id)
                            .populate('user', 'name')
                            .populate('category', 'name');

    res.json(product);

}

const updateProduct = async(req, res = response) => {

    const { id } = req.params;
    const { estado, user, ...data } = req.body;

    if(data.name){
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true})

    res.json( product );

}


const deleteProduct = async(req, res = response) => {

    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndUpdate(id, {estado:false}, {new: true})
    
    res.json( deletedProduct );

}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    getProduct,
    deleteProduct
}