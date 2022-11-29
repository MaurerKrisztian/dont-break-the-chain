import { Schema, model, connect } from 'mongoose';
import { IHabit } from '../interfaces/habit.interface';

const habitSchema = new Schema<IHabit>({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
});

export const HabitModel = model<IHabit>('habit', habitSchema);
