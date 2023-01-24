const Role = require('..//models/role');
const {User, Category, Product} = require('..//models');



const isValidRole = async (role = "") => {
    const existsRole = await Role.findOne({ role });
    if(!existsRole){
        throw new Error(`Role ${ role } It's not a valid role`);
    }
}

//verify if the email exists 
const isValidEmail = async (email = "") => {
    const emailExists = await User.findOne({ email });
    if(emailExists) {
        throw new Error(`The Email: ${ email }, already registered`);
    }
}

//verify if the id exists 
const isValidId = async (id) => {
    const idExists = await User.findById( id );
    if(!idExists) {
        throw new Error(`The Id: ${ id } does not exist`);
    }
}

//categories
const existsCategoryById = async ( id ) => {

    const existsCategory = await Category.findById( id );
    if(!existsCategory) {
        throw new Error(`The Id: ${ id } does not exist`);
    }

}


//products
const existsProductById = async ( id ) => {

    const existsProduct = await Product.findById( id );
    if(!existsProduct) {
        throw new Error(`The Id: ${ id } does not exist`);
    }

}



module.exports = {
    isValidRole,
    isValidEmail,
    isValidId,
    existsCategoryById,
    existsProductById
}