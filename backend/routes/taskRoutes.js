import express from 'express';
import { 
    getAllTasks, 
    getTaskById, 
    createTask, 
    updateTask, 
    deleteTask, 
    searchTasks 
} from '../controllers/taskController.js';
import { requireAuth } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.get('/', requireAuth, getAllTasks);
router.get('/search', requireAuth, searchTasks); 
router.get('/:id', requireAuth, getTaskById);
router.post('/', requireAuth, createTask);
router.put('/:id', requireAuth, updateTask);
router.delete('/:id', requireAuth, deleteTask);

export default router;