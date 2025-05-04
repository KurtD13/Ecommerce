import express from 'express';
import * as controller from '../controllers/Controllers.js';

const router = express.Router();

router.get('/product', controller.getProducts);
router.post('/product', controller.createProducts);
router.put('/product/:id', controller.updateProduct);

export default router;