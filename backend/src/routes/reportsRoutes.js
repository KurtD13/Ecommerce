import express from 'express';
import * as controller from '../controllers/reportsControllers.js';

const router = express.Router();

router.get('/report', controller.getReports);
router.post('/report', controller.createReports);
router.put('/report/:reportid', controller.updateReportstatus);
router.delete('/report/:reportid', controller.deleteReport);

export default router;