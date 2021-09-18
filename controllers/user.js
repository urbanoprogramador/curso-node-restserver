const { response, request } = require("express");
const { generatepass } = require("../helpers/generate-pass");
const Usuario=require('../models/user');


const url = require('url');

function fullUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.baseUrl
  });
}

const userGet = async(req = request, res = response) => {
    const {limit=3,page=1}=req.query;
/*     console.log(fullUrl(req));
    console.log(req.url);
    console.log(req.baseUrl); */


    const [total,users]=await Promise.all([
         Usuario.countDocuments({estado:true}),
         Usuario.find({estado:true})
        .skip(Number(page)-1>=0?Number(page)-1:0)
        .limit( Number(limit) )
    ]); 


    res.json({path:fullUrl(req),total,users});
};

const userPut = async(req = request, res = response) => {
    const id=req.params.id;
    const user=await Usuario.findByIdAndUpdate(id,req.DataUser);
    res.json({
        id,
        user,
        msj: 'put api | controllador'
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

const userDelete = async(req = request, res = response) => {

    const id=req.params.id;
    await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({
        msj: `el usuario con el id ${id} se a borrado satisfactoriamente`
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