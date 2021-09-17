const {Router} = require('express');
const userController = require('../controllers/user');

const router=Router();

router.get('/',userController.userGet);
router.put('/:id/:algo?',userController.userPut);
router.post('/',userController.userPost);
router.delete('/',userController.userDelete);
router.copy('/',userController.userCopy);

module.exports=router;