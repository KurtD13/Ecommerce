import express from 'express';
import * as controller from '../controllers/productcategoryController.js';

const router = express.Router();

router.get('/category', controller.getCategory);
router.post('/category', controller.createCategory);
router.put('/category/:categoryid', controller.updateCategory);
router.delete('/category/:categoryid', controller.deleteCategory);


export default router;