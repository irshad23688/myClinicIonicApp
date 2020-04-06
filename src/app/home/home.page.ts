/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireDatabase , AngularFireObject } from '@angular/fire/database';
import { database } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
paitentref : any;
textdata:any;
name:any;
mobileNo:any;
ref:any;
 arrpush = [];
  constructor(private toastController: ToastController, public loadingController: LoadingController,
     private fireauth: AngularFireAuth, private router: Router , private afd: AngularFireDatabase) { 
     
     this.paitentref = this.afd.list('/paitents');
     }
  

  displayText(event){
  
  let mobileArrayValue={
    name: this.name,
    mobileNo:this.mobileNo

  } 
    //   this.afd.list('/patients').valueChanges().subscribe(data => {
    // this.textdata = data
    // console.log("event" , event.target.value);
    // console.log(this.textdata);
    // this.textdata.forEach(element => {
     
    //   if(element.name.includes(event.target.value))
    //   {
    //     console.log("thissss" , element.name , element.mobileNo);
    //     let searchObjects={
    //       name: element.name,
    //       mobileNo:element.mobileNo
    //     }
      
    //     this.arrpush.push(searchObjects)
    //   }
      
           
    
      
    // });
    var ref = database().ref('patients');
    ref.on('value' , gotData)

    function gotData(data){
      var scores = data.val();
      var keys = Object.keys(scores);
      console.log("keyyyy" , keys);
    }
    
  }
  
  

}