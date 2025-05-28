import express from 'express';
import * as controller from '../controllers/productvariationController.js';

const router = express.Router();

router.get('/variation', controller.getVariation);
router.post('/variation', controller.createVariation);
router.put('/variation/:pvid', controller.updateVariation);
router.delete('/variation/:pvid', controller.deleteVariation);
router.get('/variation/productkey/:q', controller.getVariationProduct);

export default router;