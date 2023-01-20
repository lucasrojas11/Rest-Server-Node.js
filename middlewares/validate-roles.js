const { response } = require('express');

const isAdminRole = (req, res = response, next) =>{

    if(!req.user){
        return res.status(500).json({
            msg: 'You want to verify the role without validating the token first'
        });
    }

    const { role, name } = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(500).json({
            msg: `${name} Not an administrator - Can't do this `
        });
    }

    next();

}  


module.exports = {
    isAdminRole
}