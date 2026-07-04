import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    task: { 
        type: String, 
        required: [true, 'Task title is required'],
        trim: true
    },
    isCompleted: { 
        type: Boolean, 
        default: false 
    }
});

export default mongoose.model('task_tbi', taskSchema);
