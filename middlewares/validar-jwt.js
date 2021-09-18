const { request, response } = require("express");
const { verifyToken } = require("../helpers/generate-pass");

const Usuario=require('../models/user');


const validarUserToken=async (req=request,res=response,next)=>{
    const payload=verifyToken(req.header('authToken'));
    if(!payload){
        return res.status(401).json({
            msg:"usuario no autorizado"
        });
    }
    try {
        const user=await Usuario.findById(payload.uid);
        if(!user){
            return res.status(401).json({
                msg:"usuario no autorizado"
            });
        }
        if(!user.estado){
            return res.status(401).json({
                msg:"usuario no autorizado"
            });
        }
        req.authUser=user;
        next();
    } catch (error) {
        return res.status(500).json({
            msg:"error en el servidor vuelve a contactarte con nosotros mas tarde"
        });
    }
}


module.exports=validarUserToken;