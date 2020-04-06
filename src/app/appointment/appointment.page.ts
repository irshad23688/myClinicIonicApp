import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var swal :any;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  public appointmentList;
  tableData;
  appointmentDataRef: AngularFireList<any>;
  appointmentObservable:Observable<any>;
  apppintmentData:any;
 appointmentLen:any;
 appointment:any;
 showMessage=true;
 id:any;
 patientRef: AngularFireList<any>;
  patientObservable:Observable<any>
  constructor(public af:AngularFireDatabase, private loadingCtrl: LoadingController) { 
    this.appointmentDataRef = af.list('/appointment');
    this.patientRef = af.list('/patients/');
  }

  ngOnInit() {
    this.appointmentList= this.af.list('/appointment');
   
    this.present();
  }
  
  
async present() {
  return await this.loadingCtrl.create({
  }).then(a => {
    console.log('a');
    a.present().then(() => {
       this.appointmentObservable = this.appointmentDataRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }));
     this.appointmentObservable.subscribe((res)=>{       
         this.tableData = res;
         
         console.log("tehddd",this.tableData);
          a.dismiss().then(() => console.log('abort presenting'));

     });

  //    this.patientObservable = this.patientRef.snapshotChanges().pipe(map(changes => {
  //     return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
  //   }));
  //  this.patientObservable.subscribe((res)=>{       
  //      this.tableData = res;
  //      console.log('key',res)
  //      res.forEach(element => {
           
  //      });
  //       a.dismiss().then(() => console.log('abort presenting'));

  //  });
        });
        this.apppintmentData = this.appointmentList.valueChanges();
        this.apppintmentData.subscribe(res=>{
        this.appointment= res;;
        if(this.appointment.length===0){
          this.showMessage=false;
        }else{
          this.showMessage=true;
        }
        console.log(res.length);
        a.dismiss().then(() => console.log('abort presenting'));
  }) 
    });
}

async dismiss() {
  return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
}

updateStatus(key,event){
  this.appointmentDataRef.update(key,{status:event.target.value}).then((res)=>{
        swal.fire('Status updated!');
    },error=>{
      swal.fire('Something Went Wrong');
    }
    );
//}
}



}
