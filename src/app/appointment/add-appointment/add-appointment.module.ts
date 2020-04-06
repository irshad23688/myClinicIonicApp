import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

import { IonicModule } from '@ionic/angular';

import { AddAppointmentPage } from './add-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: AddAppointmentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    DatePickerModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddAppointmentPage]
})
export class AddAppointmentPageModule {}
