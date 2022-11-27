import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HabitTrackerComponent} from "./habit-tracker/habit-tracker.component";
import {BoxComponent} from "./box-activity/box/box.component";
import {BoxTableComponent} from "./box-activity/box-table/box-table.component";
import {HabitEndpoints} from "../services/habit.endpoints";
import {HabitDayStatusEndpoints} from "../services/habit-day-status.endpoints";
import {ApiService} from "../services/api.service";
import {HttpClientModule} from "@angular/common/http";
import { MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HabitTrackerComponent,
    BoxComponent,
    BoxTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    FormsModule,
  ],
  providers: [HabitEndpoints, HabitDayStatusEndpoints, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
