const { response, request } = require("express");
const Usuario=require('../models/user');

const userGet = async(req = request, res = response) => {

    const users=await Usuario.find();
    res.json({users});
};

const userPut = (req = request, res = response) => {
    const id=req.params.id;
    res.json({
        id,
        msj: 'put api | controllador',
        params:req.params
    });
};

const userPost = async(req = request, res = response) => {
    const usuario=new Usuario(req.DataUser);
    await usuario.save();
    res.json({
        usuario,
        msj: 'post api | controllador'
    });
};

const userDelete = (req = request, res = response) => {
    res.json({
        msj: 'delet api | controllador'
    });
};

const userCopy = (req = request, res = response) => {
    res.json({
        msj: 'copy api | controllador'
    });
};


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userCopy
}