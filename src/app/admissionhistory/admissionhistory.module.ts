import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import{HttpModule} from '@angular/http'


import { IonicModule } from '@ionic/angular';

import { AdmissionhistoryPage } from './admissionhistory.page';

const routes: Routes = [
  {
    path: '',
    component: AdmissionhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdmissionhistoryPage]
})
export class AdmissionhistoryPageModule {}
