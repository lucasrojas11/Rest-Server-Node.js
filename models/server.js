const express = require('express')
const cors = require('cors')

//const {} = require("../database/config");
const { dbConnection } = require('..//database/config');

class Server {

  constructor(){
    this.app = express(); //creamos la aplicacion de express como una propiedad de la clase servidor 
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    //DB Conection
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de la aplicacion
    this.routes(); //llamamos a las rutas 
  }

  async conectarDB(){
    await dbConnection();
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
    
    this.app.use(this.usersPath, require('../routes/users.routes'));

  }

  listen(){
    this.app.listen(this.port, () => {
      console.log('listening on port ' + this.port);
    });
  }

}



module.exports = Server;