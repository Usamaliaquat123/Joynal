
import { JoynalApiProvider } from './../../../../providers/joynal-api/joynal-api';
import { Component, Output, EventEmitter } from '@angular/core';
import { AlertController, NavController, ActionSheetController } from 'ionic-angular';
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
  imageUpload : boolean;
  entry = {} as entry;
  title : any;
  achievements : any;
  description : any;
  constructor(private actionSheet : ActionSheetController,private camera : Camera ,private httpClient: HttpClient,private storage : Storage,private  joynalApi: JoynalApiProvider ,private alertCtrl: AlertController,public navCtrl : NavController ) {
    this.imageUpload = false;
    this.date =  moment().format('Do MMMM YYYY');
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
        entryImageUrl: this.base64Image,
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
        this.entries = [];
      })
    }else{
      this.navCtrl.push('AddEntryPage').then(() => {
        let alert = this.alertCtrl.create({
          title: '<h1 text-center>Did you know</h1>',
          subTitle: success.data.post,
          buttons: ['Dismiss']
        }); 
        alert.present();
        this.entries = [];
      })
    }
    
   },err => {
     console.log(err),
     this.entries = [];
   })
  })
  })
})

}
  getLocation(){
    // getting location using ionic capacitor
  }
  addingImage(){
    // Action Sheet
    let actionSheet = this.actionSheet.create({
      title: 'SET PICTURE',
      buttons: [
        {
          text: 'choose from albums',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'take a photo',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'cancel',
          role: 'cancel'
        }
      ]});
      actionSheet.present();
  }
  // Create an array of entries 
againAddEntry(){
  // Checking if user uploaded an image 
  if(this.base64Image == null || this.base64Image == undefined){
    this.entries.push(
      {
       title:this.title,
       description:this.description,
       state:"England",
       country: "England",
       city:"England",
       longitude:"England",
       latitude:"England",
       entryImageUrl: 'notUploadedByUser',
       entryImageType:".jpg",
      });
      this.description = '';
      this.title = '';
      console.log(this.entries);
      this.getEntries.emit(this.entries);
  }else{
    this.entries.push(
      {
       title:this.title,
       description:this.description,
       state:"England",
       country: "England",
       city:"England",
       longitude:"England",
       latitude:"England",
       entryImageUrl: this.base64Image,
       entryImageType:".jpg",
      });
      this.description = '';
      this.title = '';
      this.base64Image = ''
    console.log(this.entries);
    this.getEntries.emit(this.entries);
  }
  
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                   C  A  M  E  R  A    S  E  T  U  P
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gallery openGallery for image upload
async openGallery(): Promise<any>{
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		targetWidth: 150,
		targetHeight: 100,
		saveToPhotoAlbum: false,
		allowEdit : false
  }
  try{ this.base64Image =  await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);}
}   
// Camera openCamera for image upload
async openCamera(): Promise<any>{
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  try{ this.base64Image = await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);}
}



}

