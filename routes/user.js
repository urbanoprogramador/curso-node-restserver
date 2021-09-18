const {Router} = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/user');
const { createUserValidate, putUsuarioValidate, deletUserValidate } = require('../validate/user');

const router=Router();

router.get('/',userController.userGet);
router.put('/:id',putUsuarioValidate,userController.userPut);
router.post('/',createUserValidate,userController.userPost);
router.delete('/:id',deletUserValidate,userController.userDelete);
router.copy('/',userController.userCopy);


module.exports=router;