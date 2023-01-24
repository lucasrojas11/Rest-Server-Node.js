const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const {User, Category, Product} = require('..//models');


const collectionsAllowed = [
    'user',
    'categories',
    'products',
    'roles'
];

const searchUsers = async(term = '', res = response) =>{

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const user = await User.findById(term);
        return res.json({
            Results: (user) ?  [user] : [] 
        });
    }

    const regex = new RegExp(term, 'i');
    
    const users = await User.find({
        $or: [{ name: regex }, { email: regex}],
        $and: [{ estado: true }]
    });

    res.json({
        results: users
    })
}

const searchCategories = async(term = '', res = response) =>{

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const category = await Category.findById(term);
        return res.json({
            Results: (category) ?  [category] : [] 
        });
    }

    const regex = new RegExp(term, 'i');
    
    const categories = await Category.find({ name: regex, estado: true });

    res.json({
        results: categories
    })
}

const searchProducts = async(term = '', res = response) =>{

    const isMongoId = ObjectId.isValid(term);

    if(isMongoId){
        const product = await Product.findById(term).populate('category', 'name');
        return res.json({
            Results: (product) ?  [product] : [] 
        });
    }

    const regex = new RegExp(term, 'i');
    
    const products = await Product.find({ name: regex, estado: true })
                            .populate('category', 'name');

    res.json({
        results: products
    })
}


const search = (req, res = response) =>{

    const { collection, term } = req.params;

    if(!collectionsAllowed.includes(collection)){
        return res.status(400).json({
            msg: `The collections allowed are ${collectionsAllowed}`
        })
    }

    switch (collection) {
        case 'user':
            searchUsers(term, res);
        break;
        case 'categories':
            searchCategories(term, res);
        break;
        case 'products':
            searchProducts(term, res);
        break;
    
        default:
            res.status(500).json({
                msg: 'Forgot to do this search'
            })
    }
}



module.exports = {
    search
}