
const express = require('express');
require('dotenv').config();
const cors=require('cors');

const port = process.env.PORT

class Server {

  constructor(){
    this.app=express();
    this.userPath='/api/users';

    this.middlewares();
    this.router();
    this.start();
  }

  router(){
    
    this.app.use(this.userPath,require('../routes/user'));
    



  }
  start(){
    this.app.listen(port,()=>{
      console.log(`servidor corriendo en el puerto ${port}`);
    });
  }
  middlewares(){
    //directorio publico
    this.app.use(cors());
    this.app.use(express.static('public'));
    this.app.use(express.json());
  }
}

module.exports=Server;
