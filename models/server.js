const express = require('express')
const cors = require('cors')

class Server {

  constructor(){
    this.app = express();  
    this.port = process.env.PORT || 3000;
    this.usersPath = '/api/users';

    //Middlewares
    this.middlewares();

    this.routes(); //llamamos a las rutas 
  }

  middlewares(){

    //CORS 
    this.app.use(cors());

    //Read and parse the body(lectura y parseo del body)
    this.app.use(express.json()); //esto serializa el body del request a un json


    //Public Directory (directorio publico)
    this.app.use(express.static('public')); 
  }

  routes(){ //definimos las rutas 
    
    this.app.use(this.usersPath, require('../routes/users'));

  }

  listen(){
    this.app.listen(this.port, () => {
      console.log('listening on port ' + this.port);
    });
  }

}



module.exports = Server;
