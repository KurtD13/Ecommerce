import express from 'express';
import * as controller from '../controllers/sellerprofileController.js';

const router = express.Router();

router.get('/seller', controller.getSeller);
router.post('/seller', controller.createSeller);
router.put('/seller/:sellerid', controller.updateSeller);
router.delete('/seller/:sellerid', controller.deleteSeller);

export default router;