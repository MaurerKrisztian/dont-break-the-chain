import mongoose from 'mongoose';


export async function connectDB() {
    return await mongoose.connect('mongodb://localhost:27017/habit-tracker');
}
