const bcryptjs=require('bcryptjs');


const generatepass=(pass)=>{
    const salt= bcryptjs.genSaltSync();
    return bcryptjs.hashSync(pass,salt);
};
module.exports={
    generatepass
}