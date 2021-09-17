const { check, validationResult } = require("express-validator");
const bcryptjs=require('bcryptjs');

const Usuario=require('../models/user');
const Rol=require('../models/rol');



const IsRolValid=(value, { req }) => {
    return Rol.findOne({
        rol:value
    }).then((rol)=>{
        if(!rol){
            return  Promise.reject(`el ${value} no esta en nuestra base de datos v`);
        }
    });
  };
const ExistEmail=(value, { req }) => {
    return Usuario.findOne({
        correo:value
    }).then((users)=>{
        if(users){
            return  Promise.reject('Este correo ya fue usado ');
        }
    });
  }
const createUserValidate=[
    check('correo','el correo no es valido').isEmail(),
    check(['nombre','password','rol','passwordConfirmation'],'este campo es requerido').exists(),
    check('password').custom((value, { req }) => {
        if (value !== req.body.passwordConfirmation) {
          throw new Error('la contraseña debe coincidir con passwordConfirmation');
        }
        return true;
    }).isLength(7).withMessage('debe tener minimo 7 carecteres'),
    check('correo').custom(ExistEmail),
    //check('rol','el rol debe ser USER_ROLE').equals('USER_ROLE').isIn(['ADMIN_ROLE','USER_ROLE']).withMessage('debe ser o uno o otro'),
    check('rol').custom(IsRolValid),
    async(req,res,next)=>{
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json(error);
        }
        const salt= bcryptjs.genSaltSync();
        const password=bcryptjs.hashSync(req.body.password,salt);


        req.DataUser={... req.body,password:password,google:false};
        next();
    },

]
module.exports={
    createUserValidate
}