const { response } = require('express');
const { Category } = require('../models');


const getCategories = async(req, res = response) => {

    try {
        
        const {limit = 5, from = 0} = req.query;
        const query = {estado: true}

        const [ total, categories ] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .populate('user', 'name')
                .skip(Number(from))
                .limit(Number(limit))
        ])

        res.json({
            total,
            categories
        }); 

    } catch (error) {
        
    }

}


const createCategoty = async(req, res = response) => {

    try {
        
        const name = req.body.name.toUpperCase();

        const categoryDB = await Category.findOne( { name });

        if(categoryDB){
            return res.status(400).json({
                msg: `The category ${categoryDB.name}, already exists`
            });
        }

        //Generate the data to be saved
        const data = {
            name,
            user: req.user._id,
        }

        const category = new Category(data);

        //Save in DB
        await category.save();

        res.status(201).json(category);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Something went wrong'
        })
    }
}

const getCategory = async(req, res = response) => {

    const { id }= req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json(category);

}

const updateCategory = async(req, res = response) => {

    const { id } = req.params;
    const { estado, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true})

    res.json( category );

}


const deleteCategory = async(req, res = response) => {

    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndUpdate(id, {estado:false}, {new: true})
    
    res.json( deletedCategory );

}

module.exports = {
    createCategoty,
    getCategories,
    updateCategory,
    getCategory,
    deleteCategory
}