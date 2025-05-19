import express from 'express';
import * as controller from '../controllers/productstatusController.js';

const router = express.Router();

router.get('/pstatus', controller.getPstatus);
router.post('/pstatus', controller.createPstatus);
router.put('/pstatus/:pstatusid', controller.updatePstatus);
router.delete('/pstatus/:pstatusid', controller.deletePstatus);

export default router;