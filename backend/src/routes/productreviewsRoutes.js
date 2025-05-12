import express from 'express';
import * as controller from '../controllers/productreviewsControllers.js';

const router = express.Router();

router.get('/reviews', controller.getReviews);
router.post('/reviews', controller.createReviews);
router.put('/reviews/:previewsid', controller.updateReviews);
router.delete('/reviews/:previewsid', controller.deleteReviews);


export default router;