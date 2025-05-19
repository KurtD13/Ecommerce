import express from 'express';
import * as controller from '../controllers/colorControllers.js';

const router = express.Router();

router.get('/color', controller.getColor); // Get all colors
router.post('/color', controller.createColor); // Create a new color
router.put('/color/:colorid', controller.updateColor); // Update a color by ID
router.delete('/color/:colorid', controller.deleteColor); // Delete a color by ID


export default router;