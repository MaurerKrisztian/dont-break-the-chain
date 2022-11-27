import { Component, Input, OnInit } from '@angular/core';
import { IBoxContent } from '../box/box.component';
import { IHabit } from '../../habit-tracker/habit-tracker.component';
import {HabitEndpoints} from "../../../services/habit.endpoints";
import {IHabitDayStatus} from "../../../services/habit-day-status.endpoints";

@Component({
  selector: 'app-box-table',
  templateUrl: './box-table.component.html',
  styleUrls: ['./box-table.component.scss'],
})
export class BoxTableComponent implements OnInit {
  private readonly dayInMs = 86_400_000;

  @Input()
  // @ts-ignore
  habit: IHabit;

  @Input()
  startDate: Date = new Date(new Date().getTime() - this.dayInMs * 3);
  @Input()
  numberOfBox = 200;

  @Input()
  boxStatuses: IHabitDayStatus[] = [];

  boxes: IBoxContent[] = [];

  constructor(private readonly habitApi: HabitEndpoints) {}

  async ngOnInit() {
    this.boxStatuses = await this.habitApi.getStatusesForHabit(this.habit._id);
    this.boxGenerator();
  }

  boxGenerator() {
    const currnetDate = new Date();

    for (let i = 0; i < this.numberOfBox; i++) {
      const boxDate = new Date(new Date().getTime() - this.dayInMs * i);
      const foundBox = this.boxStatuses.find((status) => {
        const date = new Date(status.date);
        return this.isDateOnTheSameDay(boxDate, date);
      });
      if (foundBox) {
        this.boxes.push({
          id: foundBox._id,
          hoverText: foundBox.note,
          date: new Date(boxDate),
          state: foundBox.status,
        });
      } else {
        this.boxes.push({
          hoverText: '',
          date: new Date(boxDate),
          state: new Date(boxDate) <= this.startDate ? 'not-done' : 'skipped',
        });
      }
      currnetDate.setTime(currnetDate.getTime() - 86_400_000);
    }
  }

  isDateOnTheSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() == date2.getFullYear() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getDate() == date2.getDate()
    );
  }
}
