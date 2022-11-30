import { Component, OnInit } from '@angular/core';
import {HabitEndpoints} from "../../services/habit.endpoints";
import {HabitDayStatusEndpoints} from "../../services/habit-day-status.endpoints";
export interface IHabit {
  name: string;
  description?: string;
  startDate: Date;
  _id: string;
}

@Component({
  selector: 'app-habit-tracker',
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.scss'],
})
export class HabitTrackerComponent implements OnInit {
  habits: IHabit[] = [];

  constructor(private readonly habitEndpoints: HabitEndpoints, private readonly habitDayStatusEndpoints: HabitDayStatusEndpoints) {}

  async ngOnInit() {
    this.habits = await this.getHabits();
    this.habits = this.habits.map((habit) => {
      habit.startDate = new Date(habit.startDate);
      return habit;
    });
  }

  async createHabit(name: string) {
    await this.habitEndpoints.create({ name: name, startDate: new Date() });
    this.ngOnInit();
  }

  getToday(){
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  getHabits(): Promise<IHabit[]> | any[] {
    return this.habitEndpoints.getAll() || [];
  }

  doneToday(_id: string, note: string, date?: string) {
    this.habitDayStatusEndpoints.create({
      date: date ? new Date(date) : new Date(),
      status: 'done',
      habitId: _id,
      note: note || ' ',
    });
    this.ngOnInit();
  }

  async delete(_id: string) {
    await this.habitEndpoints.deleteById(_id);
    this.ngOnInit();
  }
}
