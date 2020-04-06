import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController, ToastController } from '@ionic/angular';
import { ViewEncapsulation } from '@angular/core';
declare var swal :any


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.page.html',
  styleUrls: ['./diagnostic.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiagnosticPage implements OnInit {
  private diagnostic : FormGroup;
  diagnosisRef:any;
  diagnosisData;
  diagnosis;
  showForm=false;
  showMessage=true;
  constructor(private formBuilder: FormBuilder, private af: AngularFireDatabase, 
    private loadingCtrl: LoadingController,public toastCtrl: ToastController ) {
      this.diagnosisRef = this.af.list('/diagnosis');
      this.present();
     }
     async present() {
    
      return await this.loadingCtrl.create({
        // duration: 5000,
      }).then(a => {
        a.present().then(() => {
            this.diagnosisData = this.diagnosisRef.valueChanges();
            this.diagnosisData.subscribe(res=>{
            this.diagnosis= res;
            this.diagnostic.reset();
            if(this.diagnosis.length===0){
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
    this.diagnostic = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  addBtn(){
    this.showForm=true;
    this.showMessage= true;
  }

  backBtn(){
     this.showForm=false;
     if(this.diagnosis.length===0){
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
    'name':this.diagnostic.value.name
  };
  console.log("ser", serviceList)

  this.diagnosisRef.push(serviceList).then((res)=>{
    console.log("ser", res)
    swal.fire('Data Saved successfully');
    this.showForm=false;
  },error=>{
    swal.fire('Something Went Wrong!');
  });
  
}

}
