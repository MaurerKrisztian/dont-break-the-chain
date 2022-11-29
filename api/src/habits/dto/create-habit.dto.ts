import { IHabit } from '../interfaces/habit.interface';
import { IsDateString, IsString } from 'bonfire-rest';

export class CreateHabitDto implements IHabit {
    _id: string;

    @IsString()
    name: string;

    // @IsString()
    // description: string;

    createdAt: Date;

    @IsDateString()
    startDate: Date;

    userId: string;
}
