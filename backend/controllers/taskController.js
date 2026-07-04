
import task_tbi from '../models/taskModel.js';

// 1. GET all tasks
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await task_tbi.find({});
        
        if (tasks.length < 1) {
            return res.status(404).json({ 
                success: false,
                message: "Tasks are empty"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Sending the list from MongoDB.",
            tasks
        });
    } catch (error) {
        next(error); 
    }
};

// 2. GET single task
export const getTaskById = async (req, res, next) => {
    try {
        const task = await task_tbi.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        
        res.status(200).json({ success: true, task });
    } catch (error) {
        next(error);
    }
};

// 3. create task
export const createTask = async (req, res, next) => {
    try {
        const { task } = req.body;
        
        if (!task) {
            return res.status(400).json({ success: false, message: "Task title is required" });
        }
        
        const newTask = await task_tbi.create({
            task,
            isCompleted: false
        });
        
        res.status(201).json({ success: true, task: newTask });
    } catch (error) {
        next(error);
    }
};

// 4. update task
export const updateTask = async (req, res, next) => {
    try {
        const { task, isCompleted } = req.body;
        
        const updatedTask = await task_tbi.findByIdAndUpdate(
            req.params.id,
            { 
                ...(task !== undefined && { task }), 
                ...(isCompleted !== undefined && { isCompleted }) 
            },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
        next(error);
    }
};

// 5. DELETE task
export const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await task_tbi.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// 6. GET search tasks
export const searchTasks = async (req, res, next) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ success: false, message: "Query string 'q' required" });
        }
        
        const filtered = await task_tbi.find({
            task: { $regex: query, $options: 'i' }
        });
        
        res.status(200).json({ success: true, tasks: filtered });
    } catch (error) {
        next(error);
    }
};