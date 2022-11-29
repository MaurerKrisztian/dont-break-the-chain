import { Body, Controller, Delete, Get, Param, Patch, Post } from 'bonfire-rest';
import { CreateHabitDayStatusDto } from '../dto/create-habit-day-status.dto';
import { habitDayStatusModel } from '../schema/habit-day-status.schema';

@Controller('habit-day-status')
export class HabitDayStatusController {
    @Post()
    async create(@Body() createHabitStatusDto: CreateHabitDayStatusDto) {
        // createHabitStatusDto.userId = user.id;
        createHabitStatusDto.date = new Date(createHabitStatusDto.date);
        return habitDayStatusModel.create(createHabitStatusDto);
    }

    @Get()
    findAll() {
        // return this.habitDayStatusRepository.find({userId: user.id});
        return habitDayStatusModel.find({});
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return habitDayStatusModel.findOne({ _id: id });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() stat: any) {
        return habitDayStatusModel.findOneAndUpdate({ _id: id }, stat, { upsert: true, new: true });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return habitDayStatusModel.remove(id);
    }
}
