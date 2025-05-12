import express from 'express';
import * as controller from '../controllers/useraddressController.js';

const router = express.Router();

router.get('/address', controller.getAddress);
router.post('/address', controller.createAddress);
router.put('/address/:addressid', controller.updateAddress);
router.delete('/address/:addressid', controller.deleteAddress);

export default router;