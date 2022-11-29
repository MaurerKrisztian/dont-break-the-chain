import mongoose from 'mongoose';
import { Env } from 'bonfire-rest';

export async function connectDB() {
    return await mongoose.connect(Env.asString('DB', 'mongodb://database/habit-tracker'));
}
