import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { ViewPatientPage } from './view-patient.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPatientPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePickerModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPatientPage]
})
export class ViewPatientPageModule {}
