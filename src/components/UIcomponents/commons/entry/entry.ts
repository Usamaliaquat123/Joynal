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
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';


@Component({
  selector: 'entry',
  templateUrl: 'entry.html',
  providers : [JoynalApiProvider]
})
export class EntryComponent {
  // output event
  @Output() getEntries = new EventEmitter();
  @Output() EntryImage = new EventEmitter();
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
  locationCity : string;
  locationCountry : string;
  singleEntryImage : string;
  lat : any;
  Lng : any;
  constructor(private loadCtrl : LoadingController,private actionSheet : ActionSheetController, public formBuilder : FormBuilder,private camera : Camera ,private httpClient: HttpClient,private storage : Storage,private  joynalApi: JoynalApiProvider ,private alertCtrl: AlertController,public navCtrl : NavController,private toast: Toast, private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder ) {
    this.imageUpload = false;
    this.date =  moment().format('Do MMMM YYYY');
    this.authForm = formBuilder.group({
      'title' : [null],
      'description': [null]
    })
  }
  didYouKnowAchievement(){
      if(this.description == '' || this.title == ''){
        this.toast.show(`Cannot post empty entry`, '3000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }else{
        if(this.base64Image == '' || this.base64Image == undefined || this.base64Image == null){
          this.toast.show(`Please Upload an image first to upload your entry`, '3000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
        
       }else{
        let alert = this.alertCtrl.create({
          title: 'Share Entries',
          message: 'Do you want your diary entries to anonymously appear to others? Your entries will be uploaded to a moderated database which only stores your entry and your general location. Your personal information won’t ever be shown.',
          buttons: [
            {
              text: 'No Thanks',
              role: 'cancel',
              handler: () => {
                this.storage.get('session.userId').then(userId=>{
                  this.storage.get('session.accessToken').then(accessToken=>{
                    console.log(userId+'   '+accessToken);
                    var headers = {user_id : ""+userId,access_token: accessToken }
                    this.joynalApi.updateUserEntryVisibility(headers,userId,"True").subscribe(resp => {
                      this.storage.set('session.isEntryVisible', 'True');
                    })
                  });
                });
                let loading = this.loadCtrl.create({
                  content: 'Please wait..',
                });
                loading.present();
                if(this.locationCity==null||this.locationCountry==null){
                  let alert = this.alertCtrl.create({
                    title: 'Location',
                    subTitle: 'You need to enter your location first to upload your entry. Please make sure you turn on your location from your device.',
                    buttons: ['Okay']
                  }); 
                  alert.present(); 
                  loading.dismiss();
                }
                else{
                  this.entries.push(
                    {
                      title:this.title,
                      description:this.description,
                      state: this.locationCity,
                      country: this.locationCountry,
                      city:this.locationCity,
                      longitude:this.lat,
                      latitude:this.Lng,
                      entryImageUrl: this.base64Image,
                      entryImageType: "jpg",
                    }
                  );
                  console.log("entries"+this.entries);
                
                this.storage.ready().then(() => {
                  this.storage.get('session.userId').then(res => {
                    this.storage.get('session.accessToken').then(accessToken => {
                      var headers = {
                        user_id : ""+res,
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
                            
                          }
                          else{
                            this.navCtrl.push('AddEntryPage').then(() => {
                             
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
              // todo
              }
            },
            {
              text: 'Okay',
              handler: () => {
                  let loading = this.loadCtrl.create({
                    content: 'Please wait..',
                  });
                  loading.present();
                  if(this.locationCity==null||this.locationCountry==null){
                    let alert = this.alertCtrl.create({
                      title: 'Location',
                      subTitle: 'You need to enter your location first to upload your entry. Please make sure you turn on your location from your device.',
                      buttons: ['Okay']
                    }); 
                    alert.present(); 
                    loading.dismiss();
                  }
                  else{
    
                    this.entries.push(
                      {
                        title:this.title,
                        description:this.description,
                        state:this.locationCity,
                        country: this.locationCountry,
                        city:this.locationCity,
                        longitude:this.lat,
                        latitude:this.Lng,
                        entryImageUrl: this.base64Image,
                        entryImageType: ".jpg",
                      }
                    );
                    console.log("entries"+this.entries);
                  
                  this.storage.ready().then(() => {
                    this.storage.get('session.userId').then(res => {
                      this.storage.get('session.accessToken').then(accessToken => {
                      
                        var headers = {
                          user_id : ""+res,
                          access_token: accessToken
                          }
                          console.log(res)
                          this.joynalApi.updateUserEntryVisibility(headers,res,'False').subscribe(entryVisibilityChanged => {
                            console.log(entryVisibilityChanged);
                            this.storage.set('session.isEntryVisible', 'False');
                          })
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
                              
                            }
                            else{
                              this.navCtrl.push('AddEntryPage');
                          }
                      },err => {
                    console.log(err),
                    this.entries = [];
                  })
                  })
                  })
                })
                  }
                // todo
              }
            }
          ]
        });
        alert.present();
       }
      }
    }
  getLocation(){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    let loading = this.loadCtrl.create({
      content: 'Locating you, Please wait...'
    });
    loading.present();
    setTimeout(() => {
      if(this.lat==null || this.Lng == null){
        this.toast.show(`Joynal could not locate you, make sure location is on`, '3000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
      loading.dismiss();
    }, 10000);
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      console.log('latitude : '+resp.coords.latitude);
      // resp.coords.longitude
      console.log('longitude : '+resp.coords.longitude);
      // Saving data lat lng
      this.lat = (resp.coords.latitude).toString();
      this.Lng = (resp.coords.longitude).toString();
      //getting device pin point location using the obtained lat and long values
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
      .then((result: NativeGeocoderReverseResult[]) => this.confirmLocation(JSON.stringify(result[0].locality),JSON.stringify(result[0].countryName),JSON.stringify(result[0].administrativeArea)))
      .catch((error: any) => {
        loading.dismiss();
        this.toast.show(`Joynal could not locate you, make sure location is on`, '3000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      });
      
      // console.log('this is device city'+this.locationCity);
      loading.dismiss();


     }).catch((error) => {
       loading.dismiss();
       this.toast.show(`Joynal could not locate you, make sure location is on`, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
       console.log('Error getting location', error);
     });
  }
  confirmLocation(city:string,country:string,state:string){
    state = state.replace(/['"]+/g, '');
    console.log(state);
    city = city.replace(/['"]+/g, '');
    country = country.replace(/['"]+/g, '');
    let alert = this.alertCtrl.create({
      title: 'Confirm your location',
      message: city+', '+country,
      buttons: [
        {
          text: 'Retry',
          role: 'cancel',
          handler: () => {
            this.getLocation();
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Save location data to database');
            this.locationCity = city;
            this.locationCountry = country;
          }
        }
      ]
    });
    alert.present();
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
  if(this.description == '' || this.title == ''){
      this.toast.show(`Cannot post invalid entry! Please submit all required entries`, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
  else{
    if(this.base64Image == null || this.base64Image == undefined){
      this.toast.show(`Upload Image is required!`, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }else{
     
    if(this.locationCity == null || this.locationCity == undefined){
      this.singleEntryImage = this.base64Image;
      this.singleEntry.push(
        {
          descriptionStuck  : this.description,
          titleStuck : this.title,
          image : 'data:image/png;base64,' + this.base64Image,
          todayDate : moment().format('DD'),
          dateMonth : moment().format('MMM'),
          state: '',
        }
    )
      this.entries.push(
        {
         title:this.title,
         description:this.description,
         state: '',
         country: '',
         city:'',
         longitude:'',
         latitude:'',
         entryImageUrl: this.base64Image,
         entryImageType:".jpg",
        });
        this.description = '';
        this.title = '';
        this.base64Image = null;
        this.locationCity = null;
      console.log(this.entries);
      this.allEntry.push(
        // this.entries,
        this.singleEntry,
        this.singleEntryImage
      )
      this.getEntries.emit(this.allEntry);
      this.EntryImage.emit(this.singleEntryImage);
      this.singleEntry = [];
      this.allEntry = [];
    }else{
      this.singleEntryImage = this.base64Image;
      this.singleEntry.push(
        {
          descriptionStuck  : this.description,
          titleStuck : this.title,
          image : 'data:image/png;base64,' + this.base64Image,
          todayDate : moment().format('DD'),
          dateMonth : moment().format('MMM'),
          state: this.locationCity,
        }
    )
      this.entries.push(
        {
         title:this.title,
         description:this.description,
         state: this.locationCity,
         country: this.locationCountry,
         city:this.locationCity,
         longitude:this.lat,
         latitude:this.Lng,
         entryImageUrl: this.base64Image,
         entryImageType:".jpg",
        });
        this.description = '';
        this.title = '';
        this.base64Image = null;
        this.locationCity = null;
      console.log(this.entries);
      this.allEntry.push(
        // this.entries,
        this.singleEntry,
        this.singleEntryImage
      )
      this.getEntries.emit(this.allEntry);
      this.EntryImage.emit(this.singleEntryImage);
      this.singleEntry = [];
      this.allEntry = [];
    }
     
    
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
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit : false
    }
    try{ this.base64Image =  await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);
      if(!this.base64Image==null){
        this.alertCtrl.create({
          title : 'Sucessfully uploaded',
          subTitle : 'Image sucessfully uploaded !',
          buttons : ['Ok']
        }).present();
      }
    }
  }   
  // Camera openCamera for image upload
  async openCamera(): Promise<any>{
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    try{ this.base64Image = await this.camera.getPicture(options); this.imageUpload = true;}catch(e){ console.log(e);
      this.alertCtrl.create({
        title : 'Sucessfully uploaded',
        subTitle : 'Image sucessfully uploaded !',
        buttons : ['Ok']
      }).present();}
  }


  ionViewDidLoad(){
    console.log("trigger location");
    this.getLocation();
  }

}

