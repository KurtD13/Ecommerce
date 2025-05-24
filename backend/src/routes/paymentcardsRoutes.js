import express from 'express';
import * as controller from '../controllers/paymentcardsController.js';

const router = express.Router();

router.get('/cards', controller.getCards);
router.post('/cards', controller.createCards);
router.put('/cards/:paymentid', controller.updateCards);
router.delete('/cards/:paymentid', controller.deleteCards);
router.get('/cards/user/:q', controller.getUserCard);

export default router;