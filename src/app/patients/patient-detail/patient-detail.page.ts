import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.page.html',
  styleUrls: ['./patient-detail.page.scss'],
})
export class PatientDetailPage implements OnInit {
  addpatients:FormGroup;
patientDetails:any;

constructor(public formBuilder: FormBuilder, private afd: AngularFireDatabase,public router : Router) {
  this.patientDetails=this.afd.list('/patients')
 }


  ngOnInit() {  this.addpatients=this.formBuilder.group({
    name:['',Validators.required],
     age:['',Validators.required],
     gender:['',Validators.required],
     mobileNo:['',Validators.required],
     email:[''],
     address:['',Validators.required]
     
   })   
  }


  onSubmit(){
    if(this.patientDetails.invalid){
      return;
    }
    console.log(this.addpatients)
    this.patientDetails.push(this.addpatients.value).then((res)=>{
      this.addpatients.reset();
      this.router.navigate(['/patients']);
      
    },error=>{
     // swal.fire('Something Went Wrong!');
     console.log("error");
    });
}
}


  


