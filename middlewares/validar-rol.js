const rolUser = (roles=[]) => {
    return (req, res, next) => {

        if(!req.authUser){
            return res.status(500).json({msg:'no hay usuario para validar rol'});
        }
        const rol=roles.find((ele)=>{
            console.log(ele);
            return ele===req.authUser.rol;
        });
        console.log('el rol es ',rol);
        if(!rol){
            return res.status(403).json({
                msg:"Usted no tiene el rol requerido"
            });
        }
        next();
    }
}


module.exports = {
    rolUser
}