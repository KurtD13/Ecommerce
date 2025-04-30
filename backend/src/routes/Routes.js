import express from 'express';

import * as controller from '../controllers/Controllers.js';

const router = express.Router();

router.get('/product', controller.getProducts);

export default router;