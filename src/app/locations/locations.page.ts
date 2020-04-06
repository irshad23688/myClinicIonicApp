import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoadingController, ToastController } from '@ionic/angular';
declare var swal :any

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LocationsPage implements OnInit {
  private labService : FormGroup;
  categoryRef:any;
  categoryData;
  categories;
  showForm=false;
  showMessage=true;
  constructor( private formBuilder: FormBuilder, private af: AngularFireDatabase, 
              private loadingCtrl: LoadingController,public toastCtrl: ToastController ) {
    this.categoryRef = this.af.list('/locationMaster');
      this.present();
  }

  async present() {
    
    return await this.loadingCtrl.create({
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
          this.categoryData = this.categoryRef.valueChanges();
          this.categoryData.subscribe(res=>{
          this.categories= res;

          if(this.categories.length===0){
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
    this.labService = this.formBuilder.group({
      name: ['', Validators.required],
      pincode: ['', Validators.compose([Validators.required])],
    });
  }

  addBtn(){
    this.showForm=true;
    this.showMessage= true;
  }

  backBtn(){
     this.showForm=false;
     if(this.categories.length===0){
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
    if(this.labService.invalid){
      return;
    }
    let dates= new Date();
    let serviceList={
      'createdDate': this.formatDate(dates).toString(),
      'name':this.labService.value.name,
      'pincode': this.labService.value.pincode
    };
    console.log("ser", serviceList)

    this.categoryRef.push(serviceList).then((res)=>{
      console.log("ser", res)
      swal.fire('Data Saved successfully');
      this.showForm=false;
    },error=>{
      swal.fire('Something Went Wrong!');
    });
    
  }
}