
import { Injectable } from '@angular/core';
import {RESTEndpoints} from "./REST.endpoints";

export interface IHabit {
  name: string;
  description?: string;
  startDate: Date;
  userId: string;
  createdAt?: Date;
  _id: string;
}

@Injectable()
export class HabitEndpoints extends RESTEndpoints<IHabit> {
  endpoint = 'habits';

  getStatusesForHabit(habitId: string) {
    return this.api.get(`${this.endpoint}/${habitId}/statuses`).toPromise();
  }
}
