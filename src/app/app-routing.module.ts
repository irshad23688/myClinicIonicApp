/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'forgot', loadChildren: './forgot/forgot.module#ForgotPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'services', loadChildren: './services/services.module#ServicesPageModule' },
  { path: 'appointment', loadChildren: './appointment/appointment.module#AppointmentPageModule' },
  { path: 'add-appointment', loadChildren: './appointment/add-appointment/add-appointment.module#AddAppointmentPageModule' },
  { path: 'locations', loadChildren: './locations/locations.module#LocationsPageModule' },
  { path: 'labsregister', loadChildren: './labsregister/labsregister.module#LabsregisterPageModule' },
  { path: 'diagnostic', loadChildren: './diagnostic/diagnostic.module#DiagnosticPageModule' },
  { path: 'doctors', loadChildren: './doctors/doctors.module#DoctorsPageModule' },
  { path: 'patients', loadChildren: './patients/patients.module#PatientsPageModule' },
  { path: 'patient-detail', loadChildren: './patients/patient-detail/patient-detail.module#PatientDetailPageModule' },
  { path: 'admissionhistory/:myid', loadChildren: './admissionhistory/admissionhistory.module#AdmissionhistoryPageModule' },
  { path: 'view-patient/:id', loadChildren: './view-patient/view-patient.module#ViewPatientPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
