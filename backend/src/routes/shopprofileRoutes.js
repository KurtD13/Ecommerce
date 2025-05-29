import express from 'express';
import * as controller from '../controllers/shopprofileController.js';

const router = express.Router();

router.get('/shop', controller.getShop);
router.post('/shop', controller.createShop);
router.put('/shop/:shopid', controller.updateShop);
router.delete('/shop/:shopid', controller.deleteShop);
router.get('/shop/userkey/:q', controller.getShopkey)
router.get('/shop/shopdata/:shopkey', controller.getShopData);
router.put('/shop/shopratings/:shopid', controller.updateShopRatings);
router.put('/shop/shopstatus/:shopid', controller.updateShopStatus);
export default router;