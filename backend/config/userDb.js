import mongoose from 'mongoose';
const userDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('UserDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
export default userDB;