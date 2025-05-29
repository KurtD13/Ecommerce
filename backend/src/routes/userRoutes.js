import express from 'express';
import * as controller from '../controllers/userController.js';

const router = express.Router();

router.get('/user', controller.getUser);
router.post('/user', controller.createUser);
router.put('/user/:consumerid', controller.updateUser);
router.delete('/user/:consumerid', controller.deleteUser);
router.get('/user/search', controller.searchUser);
router.post('/user/login', controller.loginUser);
router.get('/user/phone/:q', controller.getUserPhone)
router.get('/user/seller/:q', controller.getuserSellerstatus)
router.get('/user/review/:q', controller.getUserNameImage)
router.put('/user/sellerstatus/:consumerid', controller.updateSellerStatus)
router.get('/user/admin/:q', controller.getUserAdmin);



export default router;