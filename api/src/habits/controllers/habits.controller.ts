import { Body, Controller, Delete, Get, Param, Post } from 'bonfire-rest';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { HabitModel } from '../schema/habit.schema';
import { habitDayStatusModel } from '../../daily-status/schema/habit-day-status.schema';

@Controller('habits')
export class HabitsController {
    @Get('/')
    get() {
        return HabitModel.find({});
    }

    @Post('/')
    create(@Body() habit: CreateHabitDto) {
        return HabitModel.create(habit);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return HabitModel.deleteOne({ _id: id });
    }

    @Get('/:id/statuses')
    getStatus(@Param('id') id: string) {
        return habitDayStatusModel.find({ habitId: id });
    }
}
