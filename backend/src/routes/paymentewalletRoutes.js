import express from 'express';
import * as controller from '../controllers/paymentewalletControllers.js';

const router = express.Router();

router.get('/ewallet', controller.getEwallet);
router.post('/ewallet', controller.createEwallet);
router.put('/ewallet/:epaymentid', controller.updateEwallet);
router.delete('/ewallet/:epaymentid', controller.deleteEwallet);

export default router;