const {Router} = require('express');
const userController = require('../controllers/user');
const { createUserValidate, putUsuarioValidate, deletUserValidate } = require('../middlewares/user');
const { rolUser } = require('../middlewares/validar-rol');

const router=Router();

router.use(rolUser(['ADMIN_ROLE','USER_ROLE']));


router.get('/',userController.userGet);
router.put('/:id',putUsuarioValidate,userController.userPut);
router.post('/',createUserValidate,userController.userPost);
router.delete('/:id',deletUserValidate,userController.userDelete);
router.copy('/',userController.userCopy);


module.exports=router;