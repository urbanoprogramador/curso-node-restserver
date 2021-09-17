const mongoose=require('mongoose');


const dbConection =async()=>{
    try {
         await mongoose.connect(process.env.ATLAS,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('se conecto correctamente');
    } catch (error) {
        console.log(error);
        throw new Error('error en la conexion');
    }


}
module.exports={
    dbConection
}