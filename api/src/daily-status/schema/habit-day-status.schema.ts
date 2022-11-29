import { Schema, model, connect } from 'mongoose';

const habitSchema = new Schema<IHabitDayStatus>({
    // createdAt?: Date;
    // _id: string;
    // userId: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: Date, required: true },
    note: { type: String, required: true },
    habitId: { type: String, required: true },
});

export const habitDayStatusModel = model<IHabitDayStatus>('habitDayStatus', habitSchema);

export interface IHabitDayStatus {
    habitId: string;
    status: 'done' | 'not-done' | string;
    note: string;
    date: Date;
    userId: string;
    createdAt?: Date;
    _id: string;
}
