import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject ,AngularFireList } from '@angular/fire/database';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment from 'moment';
import { ActivatedRoute , Router } from '@angular/router';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { checkAndUpdateTextDynamic } from '@angular/core/src/view/text';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var swal :any;
 
class disease {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.page.html',
  styleUrls: ['./view-patient.page.scss'],
})
export class ViewPatientPage implements OnInit {
  public patientList;
  tableData;
  viewpatient: FormGroup;
  patientDetails:any;
  public dateValue: Date = new Date();
  minDate: string = new Date().toISOString();
  fromdate: Date = new Date();
  todate: Date = new Date();
  patientKey:any;
  diagnosisRef: AngularFireList<any>;
  diagnosisObservable:Observable<any>
  orderData:any={}
  arrpush=[];
  diseases:any;
  admissionObjRef :AngularFireObject<any>;
  key:any;

  constructor(public af:AngularFireDatabase, private loadingCtrl: LoadingController,private activatedRoute: ActivatedRoute,public formBuilder: FormBuilder, private afd: AngularFireDatabase, public route:Router) { 
    this.patientDetails=this.afd.list('/admissions')
    this.diagnosisRef = this.afd.list('/diagnosis');

  }

  backBtn(){
 this.route.navigate(['/admissionhistory/', this.patientKey]);
  }

  ngOnInit() {
    
    this.patientList= this.af.list('/patients');
    this.present();
    this.patientKey = this.activatedRoute.snapshot.paramMap.get("id");

    this.viewpatient=this.formBuilder.group({
     fromdate:['',Validators.required],
       todate:['',Validators.required],
       disease:['',Validators.required],
       amount:['',Validators.required],
       treatment:['',Validators.required],
       
     });   
  }
  
 
async present() {
  return await this.loadingCtrl.create({
  }).then(a => {

    this.af.object("/patients/"+this.activatedRoute.snapshot.paramMap.get('id')).valueChanges().subscribe((res) => {
      this.orderData = res;

      let searchObjects={
      name: this.orderData.name,
      age:this.orderData.age,
      gender:this.orderData.gender,
      mobileNo:this.orderData.mobileNo,
      email:this.orderData.email,
      address:this.orderData.address

      }
      this.arrpush.push(searchObjects);
      
      });
      this.diagnosisObservable = this.diagnosisRef.snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }));
     this.diagnosisObservable.subscribe((res)=>{       
         console.log("diagnosis" , res);
         this.diseases=res;
   
     });
    });
 
}

async dismiss() {
  return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
}

getExerciseOptions(id): Promise<any> {
  var ref =this.af.database.ref("admissions");
  return ref.orderByChild("patientId").equalTo(id)
    .once("value")
    .then(snapshot => {
      var exercises:any;
      snapshot.forEach(snap => {
        exercises=snap.key;    
      
      return false;
      });
      return exercises;
  });
}
onSubmit(){
  this.viewpatient.value.fromdate= 
  moment(this.viewpatient.value.fromdate).format("YYYY-MM-DD hh:mm a");
  this.viewpatient.value.todate= 
  moment(this.viewpatient.value.todate).format("YYYY-MM-DD hh:mm a");


this.getExerciseOptions(this.activatedRoute.snapshot.paramMap.get('id')).then(exercises => {

  if(exercises){
   
    var ref =this.af.database.ref("admissions/"+exercises+"/history");
    var concatDisease=[];
    this.viewpatient.value.disease.forEach(element => {
      concatDisease.push({"name": element.name,"key": element.key});
    });
    this.viewpatient.value.disease=concatDisease;
    ref.push(this.viewpatient.value);
    
  }else{
    console.log("key else:"+exercises)
    var admission ={
      patientId :this.activatedRoute.snapshot.paramMap.get('id'),
      history:[this.viewpatient.value]
    };
    this.patientDetails.push(admission);
  }
  swal.fire('Admission done');
  this.viewpatient.reset();
});

}



portChange(event: {
  component: IonicSelectableComponent,
  value: any
}) {
  console.log('diseas:', event.value);
}

}











