import express from 'express';
import * as controller from '../controllers/shopreportControllers.js';

const router = express.Router();

router.get('/shopreport', controller.getReports);
router.post('/shopreport', controller.createReports);
export default router;