import { Component, OnInit } from '@angular/core';
import { and } from '@angular/router/src/utils/collection';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ActivatedRoute , Router } from '@angular/router';


@Component({
  selector: 'app-admissionhistory',
  templateUrl: './admissionhistory.page.html',
  styleUrls: ['./admissionhistory.page.scss'],
})
export class AdmissionhistoryPage implements OnInit {
//   admissions =[{
//     patientKey :"1",
//     history:[{fromdate :"2020-12-12",enddate :"2020-12-12",diagnosis:["COld","Cough"],treatment :"1.2"},  {fromdate :"2020-12-12",enddate :"2020-12-2",diagnosis:["flu","Cough"],treatment :"1.1"}]}
// ,{
//     patientKey :"2",
//     history:[{fromdate :"2020-12-12",enddate :"2020-12-12",diagnosis:["COld","Cough"],treatment :"3"}]
// }
// ,{
//     patientKey :"3",
//     history:[{fromdate :"2020-12-12",enddate :"2020-12-12",diagnosis:["COld","Cough"],treatment :"4"}]
// }]

add:any;
history:any;
arrpush = [];
appointmentDataRef:any;
appointmentObservable:any;
disease = [];

historydetail = [];
  constructor(private https:Http,public af:AngularFireDatabase , private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.appointmentDataRef=this.af.list('/patients');
   }
 
  ngOnInit(){
   /* let data = this.router.navigateByUrl('/patients/-M3LxaDwVWgar7EwrkE4');
    console.log("dataaaa" ,data); */
    console.log("url" , this.activatedRoute.snapshot.paramMap.get('myid'));
 

  this.getExerciseOptions(this.activatedRoute.snapshot.paramMap.get('myid')).then(exercises => {
    console.log(exercises);
    this.historydetail = exercises;
    console.log(this.historydetail);

    
   /* if(exercises){
      console.log("key ifff:"+exercises)
      //this.afd.object("admissions/"+exercises+"/history").push(this.viewpatient.value);
      this.af.object("admissions/"+exercises).valueChanges().subscribe((res) => { 
            this.orderData = res;
          console.log("test",this.orderData.history);
          console.log("test",this.orderData.history.length);

          this.historydetail.push(this.orderData.history)
          console.log("amoubt" , this.historydetail.length)
          this.historydetail.forEach(element => {
            console.log("histroy" , element);
            let searchObjects={
              fromdate: element.fromdate,
              enddate:element.todate,
              amount:element.amount,
              treatment:element.treatment,
             diagnosis:element.disease
            }
            this.arrpush.push(searchObjects);
          });
            
   
      });
     
    }else{
      console.log("key else:"+exercises)
    }*/
 });

  }

 getExerciseOptions(id): Promise<any> {
  var ref =this.af.database.ref("admissions");
  return ref.orderByChild("patientId").equalTo(id)
    .once("value")
    .then(snapshot => {
      var exercises:any=[];
      snapshot.forEach(snap => {
        snap.child("history").forEach(child =>{

          exercises.push(child.val());    
        });
      
      return false;
      });
      return exercises;
  });
}

}
