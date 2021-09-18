const { check, validationResult } = require("express-validator");
const { response, request } = require("express");


const Usuario = require('../models/user');
const { generatepass , compare } = require("../helpers/generate-pass");


const loginValidate=[
    check(['correo', 'password'], 'este campo es requerido').exists(),
    (req=request,res=response,next)=>{

        const error = validationResult(req);
        const {id}=error.mapped();
        if(id){
            if(id.msg=="Este usuario no esta registrado"){
                return res.status(404).json({msg:"recurso no encontrado"});
            }
        }
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }
        next();
    },
    async (req=request,res=response,next)=>{
        const {correo,password}=req.body;
        const user= await Usuario.findOne({correo:correo});
        if(!user){
            return res.status(400).json({msg:"correo o contraseña invalida"});
        }
        if(!user.estado){
            return res.status(400).json({msg:"correo o contraseña invalida"});
        }
        if(!compare(password,user.password)){
            return res.status(400).json({msg:"correo o contraseña invalida"});
        }
        req.udi=user.id;
        next();
    },
];

module.exports={
    loginValidate
}