const { response, json } = require('express');
const User = require('..//models/user');

const bcryptjs = require('bcryptjs');

const { generateJWT } = require('..//helpers/generate-jwt');
const { googleVerify } = require('..//helpers/google-verify');


const loggin = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //verify email exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({
                msg: 'Email does not exist'
            })
        }

        //If the user is active
        if(!user.estado){
            return res.status(400).json({
                msg: 'The user is not active'
            })
        }

        //Verify password
        const validPassword = bcryptjs.compare( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //Generate the JWT token
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
}

const googleSignIn = async(req,res = response) => {

    const { id_token } = req.body;

    try {

        const {name, img, email} = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if(!user){
            //crate user
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true,
                role: 'USER_ROLE'
            };

            user = new User(data);
            await user.save();
        }

        //
        if(!user.estado ){
            return res.status(401).json({
                msg: 'Talk to the administrator, user blocked'
            })
        }

        //Generate the JWT token
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Token cannot be verified"
        })
    }

}



module.exports = {
    loggin,
    googleSignIn
}