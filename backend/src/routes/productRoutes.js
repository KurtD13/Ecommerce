import express from 'express';
import * as controller from '../controllers/productControllers.js';

const router = express.Router();

router.get('/product', controller.getProducts);
router.post('/product', controller.createProducts);
router.put('/product/:pid', controller.updateProduct);

export default router;