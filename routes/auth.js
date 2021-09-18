const {Router} = require('express');
const authController = require('../controllers/auth');
const { loginValidate } = require('../middlewares/auth');

const router=Router();

router.post('/login',loginValidate,authController.loginControler);
router.get('/perfil',authController.myPerfil);

module.exports=router;