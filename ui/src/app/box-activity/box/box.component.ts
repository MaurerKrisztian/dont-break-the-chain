import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {HabitDayStatusEndpoints} from "../../../services/habit-day-status.endpoints";

export interface IBoxContent {
  id?: string;
  hoverText: string;
  date: Date;
  state?: 'not-done' | 'done' | 'skipped' | string;
}

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @Input()
  // @ts-ignore
  habitId: string;

  @Input()
  contetnt: IBoxContent = {
    hoverText: '',
    date: new Date(),
    state: 'not-done',
  };

  private readonly stateTextMap = {
    'not-done': '',
    done: 'Well Done!',
    skipped: 'Skipped.',
  };

  // @ts-ignore
  dialogRef: MatDialogRef<unknown, any>;

  constructor(
    private readonly habitDayStatus: HabitDayStatusEndpoints,
    public dialog: MatDialog
  ) {}

  getDisplayText() {
    return `${
      // @ts-ignore
      this.stateTextMap[this.contetnt.state]
    } \n ${this.contetnt.hoverText} \n ${new Date(
      this.contetnt.date
    ).toLocaleDateString()}`;
  }

  ngOnInit(): void {}

  async openDayPopup(template: any, contetnt: IBoxContent) {
    console.log(contetnt);
    if (contetnt.id) {
      const day = await this.habitDayStatus.findById(contetnt.id);
      this.dialogRef = this.dialog.open(template, {
        // disableClose: true,
        data: day,
      });
    } else {
      const day = await this.habitDayStatus.create({
        status: this.contetnt.state,
        date: new Date(this.contetnt.date),
        habitId: this.habitId,
        note: ' ',
      });
      this.contetnt.id = day._id;
      this.openDayPopup(template, contetnt);
    }
  }

  async editDay(param: { id: string; note: string; status: string }) {
    await this.habitDayStatus.update(param.id, {
      note: param.note,
      status: param.status,
    });
    this.dialogRef.close();
    this.contetnt.state = param.status;
    this.contetnt.hoverText = param.note;
  }
}
