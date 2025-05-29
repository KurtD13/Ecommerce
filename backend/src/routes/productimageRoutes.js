import express from 'express';
import * as controller from '../controllers/productimageController.js';
const router = express.Router();

router.get('/image', controller.getImage);
router.post('/image', controller.createImage);
router.put('/image/:pimageid', controller.updateImage);
router.delete('/image/:pimageid', controller.deleteImage);
router.get('/images/:q', controller.getImages);


export default router;