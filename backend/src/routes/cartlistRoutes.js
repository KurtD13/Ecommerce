import express from 'express';
import * as controller from '../controllers/cartlistCountrollers.js';

const router = express.Router();

router.get('/cart', controller.getCart);
router.post('/cart', controller.createCart);
router.put('/cart/:cartid', controller.updateCart);
router.delete('/cart/:cartid', controller.deleteCart);

export default router;