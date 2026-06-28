// backend/controllers/taskController.js

let tasks = [
    { id: 1, task: "Call Ayush", isCompleted: true },
    { id: 2, task: "Is Ayush present", isCompleted: false },
    { id: 3, task: "Have you got the assingment", isCompleted: false }
];

// 1. GET all tasks
export const getAllTasks = (req, res) => {
    if (tasks.length < 1) {
        return res.status(404).json({ 
            success: false,
            message: "Tasks are empty"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Sending the list from List Array.",
        tasks
    });
};

// 2. GET single task
export const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    const foundTask = tasks.find(t => t.id === id);
    if (!foundTask) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, task: foundTask });
};

// 3. create task
export const createTask = (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ success: false, message: "Task title is required" });
    }
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        task,
        isCompleted: false
    };
    tasks.push(newTask);
    res.status(201).json({ success: true, task: newTask });
};

// 4. update task
export const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const { task, isCompleted } = req.body;
    const itemIndex = tasks.findIndex(t => t.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }

    tasks[itemIndex] = {
        ...tasks[itemIndex],
        task: task !== undefined ? task : tasks[itemIndex].task,
        isCompleted: isCompleted !== undefined ? isCompleted : tasks[itemIndex].isCompleted
    };
    res.status(200).json({ success: true, task: tasks[itemIndex] });
};

// 5. DELETE task
export const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = tasks.findIndex(t => t.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }

    tasks.splice(itemIndex, 1);
    res.status(204).send();
};

// 6. GET search tasks
export const searchTasks = (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ success: false, message: "Query string 'q' required" });
    }
    const filtered = tasks.filter(t => t.task.toLowerCase().includes(query.toLowerCase()));
    res.status(200).json({ success: true, tasks: filtered });
};