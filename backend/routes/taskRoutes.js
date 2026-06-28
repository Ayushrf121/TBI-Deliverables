// backend/routes/taskRoutes.js
import express from 'express';
import { 
    getAllTasks, 
    getTaskById, 
    createTask, 
    updateTask, 
    deleteTask, 
    searchTasks 
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/search', searchTasks); 
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;