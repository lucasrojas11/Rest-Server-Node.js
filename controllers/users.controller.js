const { response, request } = require('express');

const gerUsers = (req = request, res = response) => {

  const queryParams = req.query;

  res.json({
    msg: 'get Api - controller',
    queryParams,
  }); 
}

const postUsers = (req, res = response) => {

  const body = req.body;

  res.json({
    msg: 'post Api - controller',
    body
  }); 
}

const putUsers = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: 'put Api - controller',
    id,
  }); 
}
const patchUsers = (req, res) => {
  res.json({
    msg: 'patch Api - controller'
  }); 
}

const deleteUsers = (req, res) => {
  res.json({
    msg: 'delete Api - controller'
  }); 
}


module.exports = {
  gerUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
}