import express from 'express';
import { 
  getCategory, 
  createCategory, 
  editCategory, 
  deleteCategory, 
  switchActivationCategory 
} from '../controllers/categoryController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getCategory);
router.post('/', authMiddleware, createCategory);
router.put('/:id', authMiddleware, editCategory);
router.delete('/:id', authMiddleware, deleteCategory);
router.patch('/:id/toggle', authMiddleware, switchActivationCategory);

export default router;
