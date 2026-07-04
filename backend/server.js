import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorMiddleware.js';
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';
dotenv.config();
const app = express();
const port = 5000;
connectDB();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Hello World!");
})

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);
app.listen(port,()=>{
    console.log(`listening at the port ${port}`);
})