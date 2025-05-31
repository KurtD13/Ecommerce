import express from 'express';
import * as controller from '../controllers/productControllers.js';

const router = express.Router();

router.get('/product', controller.getProducts);
router.post('/product', controller.createProducts);
router.put('/product/:pid', controller.updateProduct);
router.delete('/product/:pid', controller.deleteProduct);
router.get('/product/search', controller.searchProduct);
router.get('/product/:pid', controller.getProductById);
router.get('/product/shop/:q', controller.getShopProducts);
router.put('/product/pratings/:pid', controller.updateProductRatings);
router.put('/product/available/:pid', controller.updateProductAvailability);
router.put('/product/shopkey/:shopkey', controller.updateAvailabilityShop);
router.put('/product/sales/:pid', controller.updateTotalSales);
router.get('/product/getsales/:pid', controller.getTotalSales);
export default router;