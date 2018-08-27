import { JoynalApiProvider } from './../../../../providers/joynal-api/joynal-api';
import { Component} from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { entry } from "../../../../models/entries";
import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
@Component({
  selector: 'entry',
  templateUrl: 'entry.html',
  providers : [JoynalApiProvider]
})
export class EntryComponent {
  userId : any;
  text: string;
  date : any;
  mainEntry = [];
  entries = [];
  entry = {} as entry;
  title : any;
  description : any;
  constructor( private httpClient: HttpClient,private storage : Storage,private  joynalApi: JoynalApiProvider ,private alertCtrl: AlertController,public navCtrl : NavController ) {
    console.log('Hello EntryComponent Component');
    this.text = 'Hello World';
  
  }
  didYouKnowAchievement(){
       this.entries.push(
         {
        title:this.title,
        description:this.description,
        state:"England",
        country: "England",
        city:"England",
        longitude:"England",
        latitude:"England",
        entryImageUrl:"England",
        entryImageType:"England",
         }
       );
    console.log("entries>"+this.entries);
  this.storage.get('session.userId').then(res => {
    console.log(res)
   // console.log(this.entries);
    
    // is.mainEntry
   this.joynalApi.creatingEntriesofUser(res,this.entries).subscribe(success => {
    console.log(success);
    this.navCtrl.push('AddEntryPage').then(() => {
      let alert = this.alertCtrl.create({
        title: '<h1 text-center>Did you know</h1>',
        subTitle: '<p text-wrap text-center>Quote about user entry appears here</p>',
        buttons: ['Dismiss']
      }); 
      alert.present();
    })
   })




  })
  
   
  }


  getLocation(){
    // getting location using ionic capacitor
  }
  addingImage(){
    // Action Sheet
  }
  againAddEntry(){
    // Save to backend and agin add entry
  
    this.entries.push(
      {
     title:this.title,
     description:this.description,
     state:"England",
     country: "England",
     city:"England",
     longitude:"England",
     latitude:"England",
     entryImageUrl:"England",
     entryImageType:"England",
      }
    );
    this.storage.get('session.userId').then(res => {
      this.joynalApi.creatingEntriesofUser(res,this.entries).subscribe(data => {

      })
    });

  }

  ionViewWillEnter(){
   this.date =  moment().format('Do MMMM YYYY');
  }

}

