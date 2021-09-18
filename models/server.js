
const express = require('express');
require('dotenv').config();
const cors=require('cors');
const { dbConection } = require('../db/config');
const validarUserToken = require('../middlewares/validar-jwt');

const port = process.env.PORT

class Server {

  constructor(){
    this.app=express();
    this.pathGobal();
    
    this.conectarbd();
    this.middlewares();
    this.router();
    this.start();
  }
  pathGobal(){
    const prefix='/api/'
    this.userPath=prefix+'users';
    this.authPath=prefix+'auth';
  }
  async conectarbd(){
    await dbConection();
  }
  router(){
    this.app.use(this.authPath,require('../routes/auth'));
    this.app.use(this.userPath,validarUserToken,require('../routes/user'));
    //this.app.use(this.userPath,require('../routes/user'));
    
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
