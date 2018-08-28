
import { JoynalApiProvider } from './../../../../providers/joynal-api/joynal-api';
import { Component, Output, EventEmitter } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { entry } from "../../../../models/entries";
import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { Camera,CameraOptions } from "@ionic-native/camera";
import moment from 'moment';
@Component({
  selector: 'entry',
  templateUrl: 'entry.html',
  providers : [JoynalApiProvider]
})
export class EntryComponent {
  // output event
  @Output() getEntries = new EventEmitter();
  userId : any;
  text: string;
  date : any;
  mainEntry = [];
  entries = [];
  base64Image : any;

  entry = {} as entry;
  title : any;
  achievements : any;
  description : any;
  constructor(private camera : Camera ,private httpClient: HttpClient,private storage : Storage,private  joynalApi: JoynalApiProvider ,private alertCtrl: AlertController,public navCtrl : NavController ) {
    console.log('Hello EntryComponent Component');
    this.text = 'Hello World';
    this.date =  moment().format('Do MMMM YYYY');
  }
  didYouKnowAchievement(){
    this.openCamera()
       this.entries.push(
         {
        title:this.title,
        description:this.description,
        state:"England",
        country: "England",
        city:"England",
        longitude:"England",
        latitude:"England",
        entryImageUrl: "ashdg.jpg",
        entryImageType:"jpg",
         }
       );
    console.log("entries>"+this.entries);
    this.storage.ready().then(() => {
  this.storage.get('session.userId').then(res => {
    this.storage.get('session.accessToken').then(accessToken => {
   
    var headers = {
      user_id : res.toString(),
      access_token: accessToken 
    }
    console.log(res)
   this.joynalApi.creatingEntriesofUser(res,headers,this.entries).subscribe(success => {
    console.log(success);
    if(success.data.achievements){
      this.achievements = success.data.achievements;
      console.log(this.achievements);
      this.navCtrl.push('AchievementsPage', this.achievements).then(() => {
        let alert = this.alertCtrl.create({
          title: '<h1 text-center>Did you know</h1>',
          subTitle: success.data.post,
          buttons: ['Dismiss']
        }); 
        alert.present();
      })
    }else{
      this.navCtrl.push('AddEntryPage').then(() => {
        let alert = this.alertCtrl.create({
          title: '<h1 text-center>Did you know</h1>',
          subTitle: success.data.post,
          buttons: ['Dismiss']
        }); 
        alert.present();
      })
    }
  
   })
  })



  })
  
   
})



  }


  openCamera(){
    console.log('openCamera');
    // Camera options		
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
  targetWidth: 150,
  targetHeight: 100,
  saveToPhotoAlbum: false,
  allowEdit : false
    }
    
    this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        // this.imageUpload = true;
        console.log(this.base64Image)
      }, (err) => {
        // Handle error
        console.log(err);
      });
  }

  getLocation(){
    // getting location using ionic capacitor
  }
  addingImage(){
    // Action Sheet
  }
  againAddEntry(){
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
    });
    this.description = '';
    this.title = '';
    console.log(this.entries);
    this.getEntries.emit(this.entries);
  }

  ionViewCanEnter(){
   this.date = moment().format('Do MMMM YYYY');
   console.log(this.date);
  }

}

