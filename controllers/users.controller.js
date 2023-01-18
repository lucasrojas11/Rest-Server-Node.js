const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('..//models/user');

const getUsers = async (req = request, res = response) => {

  const {limit = 5, from = 0} = req.query;
  const query = {estado: true}

    const [ total, users ] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

  res.json({
    total,
    users
  }); 
}

const postUsers = async (req, res = response) => {

  const {name, email, password, role} = req.body;
  const user = new User({name, email, password, role});
  
  //save in DB
  await user.save();

  res.json({
    msg: 'post Api - controller',
    user
  }); 
}

const putUsers = async (req, res = response) => {
  const {id} = req.params;
  const {_id, password, google, email, ...rest} = req.body;
  
  if(password){
    //encryption password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user); 
}
const patchUsers = (req, res) => {
  res.json({
    msg: 'patch Api - controller'
  }); 
}

const deleteUsers = async(req, res) => {

  const {id} = req.params;

  //Physical deletion of the DB, not recommended
  // const user = await User.findByIdAndDelete(id);

  //Elimination by state 
  const user = await User.findByIdAndUpdate(id , {estado : false});



  res.json(user); 
}


module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
}