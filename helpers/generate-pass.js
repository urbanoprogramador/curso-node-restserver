const bcryptjs=require('bcryptjs');
var jwt = require('jsonwebtoken');
;

const generatepass=(pass)=>{
    const salt= bcryptjs.genSaltSync();
    return bcryptjs.hashSync(pass,salt);
};


const compare=(pass,userpass)=>{
    return bcryptjs.compareSync(pass,userpass);
}

const generateToken=(uid)=>{
    var token = jwt.sign({ uid }, process.env.SING,{expiresIn:'4h'});
    return token;
}

const verifyToken=(token)=>{
    try {
        const decoded = jwt.verify(token, process.env.SING);
        return decoded;
    } catch(err) {
        console.log('esto es un error en el token');
        console.log(err);
        return null;
    }
}

module.exports={
    generatepass,
    compare,
    generateToken,
    verifyToken
}