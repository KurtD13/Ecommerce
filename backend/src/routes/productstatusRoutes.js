import express from 'express';
import * as controller from '../controllers/productstatusController.js';

const router = express.Router();

router.get('/pstatus', controller.getPstatus);
router.post('/pstatus', controller.createPstatus);
router.put('/pstatus/:pstatusid', controller.updatePstatus);
router.delete('/pstatus/:pstatusid', controller.deletePstatus);
router.put('/pstatus/cancel/:pstatusid', controller.cancelOrder);
router.put('/pstatus/pay/:pstatusid', controller.payOrder);
router.get('/pstatus/product/:q', controller.getProductStatusInfo);
router.put('/pstatus/seller/:pstatusid', controller.updatePstatusSeller);
export default router;