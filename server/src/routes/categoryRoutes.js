import express from 'express';
import { getCategory, createCategory } from '../controllers/categoryController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/', getCategory);
router.post('/', authMiddleware, createCategory);

export default router;
