import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HabitTrackerComponent} from "./habit-tracker/habit-tracker.component";

const routes: Routes = [{component: LoginComponent, path: "login"}, {component: HabitTrackerComponent, path: "habits"}, {component: LoginComponent, path: ""}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
