const Role = require('..//models/role');
const User = require('..//models/user');



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
        throw new Error(`El Email: ${ email } ya está registrado`);
    }
}

//verify if the id exists 
const isValidId = async (id) => {
    const idExists = await User.findById( id );
    if(!idExists) {
        throw new Error(`El Id: ${ id } no existe`);
    }
}



module.exports = {
    isValidRole,
    isValidEmail,
    isValidId
}