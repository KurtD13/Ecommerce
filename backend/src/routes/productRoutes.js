import express from 'express';
import * as controller from '../controllers/productControllers.js';

const router = express.Router();

router.get('/product', controller.getProducts);
router.post('/product', controller.createProducts);
router.put('/product/:pid', controller.updateProduct);
router.delete('/product/:pid', controller.deleteProduct);
router.get('/product/search', controller.searchProduct);
router.get('/product/:pid', controller.getProductById);
export default router;