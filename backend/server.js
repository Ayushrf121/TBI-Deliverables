import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorMiddleware.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import userDB from './config/userDb.js';
import passport from 'passport';
import './config/passportConfig.js';
dotenv.config();
const app = express();
const port = 5000;
userDB();
connectDB();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.get('/',(req,res)=>{
    res.send("Hello World!");
})

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', userRoutes);
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`listening at the port ${port}`);
})