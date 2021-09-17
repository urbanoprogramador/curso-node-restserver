const { Schema, model } = require("mongoose");


const RolSchema=Schema({
    rol:{
        type:String,
        required:[true,'el nombre es obligatorio']
    },
},{collection:'roles'});

module.exports=model('rol',RolSchema);