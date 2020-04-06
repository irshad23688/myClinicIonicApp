import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController, ToastController } from '@ionic/angular';
import { ViewEncapsulation } from '@angular/core';
declare var swal :any


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorsPage implements OnInit {
  private doctor : FormGroup;
  doctorRef:any;
  doctorData;
  doctors;
  showForm=false;
  showMessage=true;
  constructor(private formBuilder: FormBuilder, private af: AngularFireDatabase, 
    private loadingCtrl: LoadingController,public toastCtrl: ToastController) {
      this.doctorRef = this.af.list('/doctors');
      this.present();
     }
     async present() {
    
      return await this.loadingCtrl.create({
        // duration: 5000,
      }).then(a => {
        a.present().then(() => {
            this.doctorData = this.doctorRef.valueChanges();
            this.doctorData.subscribe(res=>{
            this.doctors= res;
            this.doctor.reset();
            if(this.doctors.length===0){
              this.showMessage=false;
            }else{
              this.showMessage=true;
  
            }
            console.log(res.length);
            a.dismiss().then(() => console.log('abort presenting'));
      })
            });
        });
      
    }
  
    async dismiss() {
      return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
    }
  ngOnInit() {
    this.doctor = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  addBtn(){
    this.showForm=true;
    this.showMessage= true;
  }

  backBtn(){
     this.showForm=false;
     if(this.doctors.length===0){
      this.showMessage=false;
    }else{
      this.showMessage=true;

    }
}
formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('-');
}

logForm(){
  let dates= new Date();
  let serviceList={
    'createdDate': this.formatDate(dates).toString(),
    'name':this.doctor.value.name
  };
  console.log("ser", serviceList)

  this.doctorRef.push(serviceList).then((res)=>{
    swal.fire('Data Saved successfully');
    this.showForm=false;
  },error=>{
    swal.fire('Something Went Wrong!');
  });
  
}

}
