import express from 'express';
import * as controller from '../controllers/userController.js';

const router = express.Router();

router.get('/user', controller.getUser);
router.post('/user', controller.createUser);
router.put('/user/:consumerid', controller.updateUser);
router.delete('/user/:consumerid', controller.deleteUser);
router.get('/user/search', controller.searchUser);
export default router;