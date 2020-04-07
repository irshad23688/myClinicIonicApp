import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  public patientList;
  tableData :[];
  searchText;
  constructor(public af:AngularFireDatabase, private loadingCtrl: LoadingController) { 
  }

  ngOnInit() {
    this.patientList= this.af.list('/patients');
    this.present();
  }
  
  
async present() {
  return await this.loadingCtrl.create({
  }).then(a => {
    console.log('a');
    a.present().then(() => {
        this.patientList.valueChanges().subscribe(data => {
        this.tableData = data;
        a.dismiss().then(() => console.log('abort presenting'));
        });
        });
    });
}

async dismiss() {
  return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
}




}
