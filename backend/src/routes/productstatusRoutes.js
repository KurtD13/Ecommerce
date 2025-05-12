import express from 'express';
import * as controller from '../controllers/productstatusController.js';

const router = express.Router();

router.get('/cart', controller.getCart);
router.post('/cart', controller.createCart);
router.put('/cart/:pstatusid', controller.updateCart);
router.delete('/cart/:pstatusid', controller.deleteCart);

export default router;