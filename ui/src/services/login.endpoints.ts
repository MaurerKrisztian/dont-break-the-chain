
import { Injectable } from '@angular/core';
import {RESTEndpoints} from "./REST.endpoints";
import {ApiService} from "./api.service";

export interface IHabit {
  name: string;
  description?: string;
  startDate: Date;
  userId: string;
  createdAt?: Date;
  _id: string;
}

@Injectable()
export class AuthEndpoints {
  constructor(readonly api: ApiService) {}
  login(data: {email: string, password: string}) {
    return this.api.post(`login`, data).toPromise();
  }

  register(data: {username: string, password: string}){
    return this.api.post(`register`, data).toPromise();
  }

}
