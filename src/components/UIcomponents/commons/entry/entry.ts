import { Toast } from '@ionic-native/toast';
import { JoynalApiProvider } from './../../../../providers/joynal-api/joynal-api';
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertController, NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { entry } from "../../../../models/entries";
import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { Camera,CameraOptions } from "@ionic-native/camera";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  authForm : FormGroup;
  mainEntry = [];
  entries = [];
  base64Image : any;
  imageUpload : boolean;
  entry = {} as entry;
  title : any;
  achievements : any;
  description : any;
  singleEntry = [];
  allEntry = [];
  image : any;
  descriptionStuck : any;
  titleStuck : any;
 
  constructor(private loadCtrl : LoadingController,private actionSheet : ActionSheetController, public formBuilder : FormBuilder,private camera : Camera ,private httpClient: HttpClient,private storage : Storage,private  joynalApi: JoynalApiProvider ,private alertCtrl: AlertController,public navCtrl : NavController,private toast: Toast ) {
    this.imageUpload = false;
    this.date =  moment().format('Do MMMM YYYY');
    this.authForm = formBuilder.group({
      'title' : [null],
      'description': [null]
    })
  }
  didYouKnowAchievement(){
      if(this.description == '' || this.title == '' || this.base64Image == '' || this.base64Image == undefined || this.base64Image == null){
        this.toast.show(`Cannot post empty entry`, '3000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }else{
        let loading = this.loadCtrl.create({
          content: 'Please wait..',
        });
        loading.present();
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
      loading.dismiss();
     console.log(success);
     if(success.data.achievements){
       this.achievements = success.data.achievements;
       console.log(this.achievements);
       this.navCtrl.push('AddEntryPage').then(() => {
        this.navCtrl.push('AchievementsPage', this.achievements).then(() => {
          let alert = this.alertCtrl.create({
            title: '<h1 text-center>Did you know</h1>',
            subTitle: success.data.post,
            buttons: ['Dismiss']
          }); 
          alert.present();
          this.entries = [];
        })
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

}
  getLocation(){
    
  }
  addingImage(){
    // Action Sheet
    let actionSheet = this.actionSheet.create({
      title: 'Upload Picture',
      buttons: [
        {
          text: 'Choose from Gallery',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Take a Photo',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]});
      actionSheet.present();
  }
  // Create an array of entries 
againAddEntry(){
  if(this.description == '' || this.title == '' || this.base64Image == '' || this.base64Image == undefined || this.base64Image == null){
    this.toast.show(`Cannot post invalid entry! Please submit all required entries`, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }else{
    if(this.base64Image == null || this.base64Image == undefined){
 
      this.singleEntry.push(
        {
          descriptionStuck  : this.description,
          titleStuck : this.title,
          image : 'data:image/png;base64,' + this.base64Image,
          todayDate : moment().format('DD'),
          dateMonth : moment().format('MMMM'),
          state:"England",
        }
    )
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
        this.allEntry.push(
          // this.entries,
          this.singleEntry
        )
        this.getEntries.emit(this.allEntry);
        this.singleEntry = [];
         this.allEntry = [];
    }else{
      this.singleEntry.push(
        {
          descriptionStuck  : this.description,
          titleStuck : this.title,
          image : 'data:image/png;base64,' + this.base64Image,
          todayDate : moment().format('DD'),
          dateMonth : moment().format('MMMM'),
          state:"England",
        }
    )
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
      this.allEntry.push(
        // this.entries,
        this.singleEntry
      )
      this.getEntries.emit(this.allEntry);
      this.singleEntry = [];
      this.allEntry = [];
    
      }
  }
 // Checking if user uploaded an image 

 
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
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		saveToPhotoAlbum: false,
		allowEdit : false
  }
  try{ this.base64Image =  await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);}
}   
// Camera openCamera for image upload
async openCamera(): Promise<any>{
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  try{ this.base64Image = await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);}
}



}

