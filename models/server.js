const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('..//database/config');

class Server {

  constructor(){
    this.app = express(); //creamos la aplicacion de express como una propiedad de la clase servidor 
    this.port = process.env.PORT;

    this.paths = {
      auth:       '/api/auth',
      categories: '/api/categories',
      search:     '/api/search',
      products:   '/api/products',
      users:      '/api/users',
      uploads:     '/api/uploads'
    }


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

    //fileupload
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath : true
    }));

  }

  routes(){ //definimos las rutas 
    
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
    this.app.use(this.paths.search, require('../routes/search.routes'));
    this.app.use(this.paths.products, require('../routes/products.routes'));
    this.app.use(this.paths.users, require('../routes/users.routes'));
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log('listening on port ' + this.port);
    });
  }

}



module.exports = Server;