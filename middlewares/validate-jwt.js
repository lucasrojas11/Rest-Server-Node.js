const { response , request }= require('express');
const jwt = require('jsonwebtoken');

const User = require('..//models/user');


const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "No token in the request"
        })
    }


    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: "Token not valid - User not found",
            })
        }

        //Verify if the uid has been true
        if(!user.estado){
            return res.status(401).json({
                msg: "Token not valid - User with status: false",
            })
        }

        req.user = user; 
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Invalid token"
        })
    }

}



module.exports = {
    validateJWT
}