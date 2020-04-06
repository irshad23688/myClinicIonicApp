import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase , AngularFireObject ,AngularFireList} from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { database } from 'firebase';
import * as moment from "moment"; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var swal :any;
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.page.html',
  styleUrls: ['./add-appointment.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAppointmentPage implements OnInit {
  addappointment: FormGroup;
  appointmentDetails:any;
  doctors:any;
  patients:any;
  addappointmentDataRef:any;
  mobiledata:any;
  mobilenumber:any;
  patientKey:any;
  addappointobj:any;
  tableData:any;
  patientRef: AngularFireList<any>;
  patientObservable:Observable<any>
  public dateValue: Date = new Date();
  minDate: string = new Date().toISOString();
  appointDate: Date = new Date();
 
  constructor(public formBuilder: FormBuilder, private afd: AngularFireDatabase ,
   private loadingCtrl: LoadingController , public router : Router) {
    this.appointmentDetails=this.afd.list('/appointment')
    this.patientRef = this.afd.list('/patients');
   }

  ngOnInit() {
    this.addappointment=this.formBuilder.group({
     patientname:['',Validators.required],
      mobileNo: [''],
      doctorname:['',Validators.required],
      appointDate:['',Validators.required],
      status:['Booked']
    }) 
     this.present();
}
async present() {
  return await this.loadingCtrl.create({
  }).then(a => {
    console.log('a');
    a.present().then(() => {
      this.afd.list('/doctors').valueChanges().subscribe(data => {
        this.doctors = data;
        a.dismiss().then(() => console.log('abort presenting'));
        });
          this.patientObservable = this.patientRef.snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          }));
         this.patientObservable.subscribe((res)=>{       
             console.log(res);
             this.patients=res;
       
      
         });
        });
        
    });
}


async dismiss() {
  return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
}

onSubmit(){
  console.log(this.addappointment.value)
  this.addappointment.value.appointDate= moment(this.addappointment.value.appointDate).format("YYYY-MM-DD hh:mm a");
      let mobileArray;
      let mobileArrayValue={
        mobileNo:this.mobilenumber,
        patientKey:this.patientKey
      } 
      mobileArray=this.addappointment.value;
      Object.assign(mobileArray,mobileArrayValue)
      this.addappointment.value.patientname=this.addappointment.value.patientname.name;
      this.appointmentDetails.push(this.addappointment.value);
      swal.fire('Data Saved successfully');
      this.addappointment.reset();
      this.mobilenumber = "";  
  }

  onCancel(){  
    this.router.navigate(['/appointment']);
 }

 displayMobileNumber(event){
  this.mobilenumber = event.detail.value.mobileNo;
  this.patientKey  = event.detail.value.key;
}
 

}
