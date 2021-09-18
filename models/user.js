const { Schema, model } = require("mongoose");


const UserSchema=Schema({
    nombre:{
        type:String,
        required:[true,'el nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'el correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'el nombre es obligatorio']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
    age:{
        type:Number,
        default:false
    }

},{collection:'users'});

UserSchema.methods.toJSON=function(){
    const {__v,password ,_id,...user}=this.toObject();
    user.uid=_id;
    return user;
}

module.exports=model('user',UserSchema);