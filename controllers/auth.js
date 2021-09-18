const { response, request } = require("express");
const { generatepass, generateToken, verifyToken } = require("../helpers/generate-pass");
const Usuario=require('../models/user');


const loginControler=(req=request,res=response)=>{
    const tokenAccess= generateToken(req.udi);
    res.json({
        login:true,
        tokenAccess
    })
}

const myPerfil=(req=request,res=response)=>{
    const payload=verifyToken(req.query.tokenAccess);
    if(!payload){
        return res.status(401).json({msg:'no autenticado'});
    }
    res.json({
        ok:true,
        payload
    });
}

module.exports = {
    loginControler,
    myPerfil
}