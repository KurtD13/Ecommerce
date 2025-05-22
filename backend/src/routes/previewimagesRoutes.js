import express from 'express';
import * as controller from '../controllers/previewimagesControllers.js';
const router = express.Router();

router.get('/preview', controller.getImage);
router.post('/preview', controller.createImage);
router.put('/preview/:imageid', controller.updateImage);
router.delete('/preview/:imageid', controller.deleteImage);


export default router;