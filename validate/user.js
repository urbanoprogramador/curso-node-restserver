const { check, validationResult } = require("express-validator");


const Usuario = require('../models/user');
const Rol = require('../models/rol');
const { generatepass } = require("../helpers/generate-pass");



const IsRolValid = (value, { req }) => {
    return Rol.findOne({
        rol: value
    }).then((rol) => {
        if (!rol) {
            return Promise.reject(`el ${value} no esta en nuestra base de datos v`);
        }
    });
};
const ExistEmail = (value, { req }) => {
    return Usuario.findOne({
        correo: value
    }).then((users) => {
        if (users) {
            return Promise.reject('Este correo ya fue usado ');
        }
    });
}


const ExistId = (value, { req }) => {
    return Usuario.findById( value).where({estado:true}).then((users) => {
        if (!users) {
            return Promise.reject('Este usuario no esta registrado');
        }
    }).catch((err)=>{
        return Promise.reject('Este usuario no esta registrado');
    });
}
const createUserValidate = [
    check('correo', 'el correo no es valido').isEmail(),
    check(['nombre', 'password', 'rol', 'passwordConfirmation'], 'este campo es requerido').exists(),
    check('password').custom((value, { req }) => {
        if (value !== req.body.passwordConfirmation) {
            throw new Error('la contraseña debe coincidir con passwordConfirmation');
        }
        return true;
    }).isLength(7).withMessage('debe tener minimo 7 carecteres'),
    check('correo').custom(ExistEmail),
    //check('rol','el rol debe ser USER_ROLE').equals('USER_ROLE').isIn(['ADMIN_ROLE','USER_ROLE']).withMessage('debe ser o uno o otro'),
    check('rol').custom(IsRolValid),
    async (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }

        const password = generatepass(req.body.password);
        req.DataUser = { ...req.body, password: password, google: false };
        next();
    },

]

putUsuarioValidate = [
    check('id').custom(ExistId),
    check('rol').custom(IsRolValid),
    (req, res, next) => {
        const error = validationResult(req);
        const {id}=error.mapped();
        if(id){
            if(id.msg=="Este usuario no esta registrado"){
                return res.status(404).json({msg:"recurso no encontrado"});
            }
        }
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }
        //const password=generatepass(req.body.password);
        const { _id, google, password, correo, ...data } = req.body;
        if (password) {
            req.DataUser = { ...data, password: generatepass(password) };
        } else {
            req.DataUser = data;
        }
        next();
    },
];
const deletUserValidate=[
    check('id').custom(ExistId),
    (req, res, next) => {
        const error = validationResult(req);
        const {id}=error.mapped();
        if(id){
            if(id.msg=="Este usuario no esta registrado"){
                return res.status(404).json({msg:"recurso no encontrado"});
            }
        }
        next();
    },
];
module.exports = {
    createUserValidate,
    putUsuarioValidate,
    deletUserValidate
}