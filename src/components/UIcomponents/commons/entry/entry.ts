import { Toast } from '@ionic-native/toast';
import { JoynalApiProvider } from './../../../../providers/joynal-api/joynal-api';
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { AlertController, NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { entry } from "../../../../models/entries";
import { Storage } from "@ionic/storage";
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';

@Component({
  selector: 'entry',
  templateUrl: 'entry.html',
  providers: [JoynalApiProvider]
})
export class EntryComponent {
  // output event
  @Output() getEntries = new EventEmitter();
  @Output() EntryImage = new EventEmitter();
  userId: any;
  text: string;
  date: any;
  authForm: FormGroup;
  mainEntry = [];
  entries = [];
  base64Image: any;
  imageUpload: boolean;
  entry = {} as entry;
  title: any;
  achievements: any;
  description: any;
  singleEntry = [];
  allEntry = [];
  image: any;
  descriptionStuck: any;
  titleStuck: any;
  locationCity: string;
  locationCountry: string;
  singleEntryImage: string;
  lat: any;
  Lng: any;
  testCatch: string;
  dayValueStreak: string;
  dayValueCombo: string;
  rewardNameStreak: string;
  rewardNameJIT: string;
  rewardNameCombo: string;
  valueStreak: string;
  valueCombo: string;
  trophyColorStreak: string;
  trophyColorCombo: string;
  trophyColorJIT: string;
  dateShow : any;

  constructor(private loadCtrl: LoadingController, private actionSheet: ActionSheetController, public formBuilder: FormBuilder, private camera: Camera, private httpClient: HttpClient, private storage: Storage, private joynalApi: JoynalApiProvider, private alertCtrl: AlertController, public navCtrl: NavController, private toast: Toast, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private diagnostic: Diagnostic, private locationAccuracy: LocationAccuracy) {
    this.imageUpload = false;
    this.dateShow =  moment().format('Do MMMM YYYY');
    this.date = moment().format('YYYY-MM-DD HH:mm:ss');
    this.authForm = formBuilder.group({
      'description': [null]
    })
  }
  didYouKnowAchievement() {
    if (this.description == '' || this.description == null) {
      this.toast.show(`Cannot post empty entry`, '3000', 'center').subscribe(
        toast => {
        }
      );
    }
    else {
      if (this.base64Image == '' || this.base64Image == undefined || this.base64Image == null) {
        this.base64Image = null;
      }
      if (this.locationCity == null || this.locationCountry == null) {
        let alert = this.alertCtrl.create({
          title: '<h1 text-center>Location Service Disabled</h1>',
          subTitle: 'You need to enter your location first to post an entry, also, make sure location service on your device is turned on',
          buttons: ['Okay']
        });
        alert.present();
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Share Entries',
          message: 'Do you want your diary entries to anonymously appear to others? Your personal information won’t ever be shown.',
          buttons: [
            {
              text: 'No, Thanks',
              role: 'cancel',
              handler: () => {
                this.storage.get('session.userId').then(userId => {
                  this.storage.get('session.accessToken').then(accessToken => {
                    var headers = { user_id: "" + userId, access_token: accessToken }
                    this.joynalApi.updateUserEntryVisibility(headers, userId, "False").subscribe(resp => {
                      this.storage.set('session.isEntryVisible', 'False');
                    })
                  });
                });
                let loading = this.loadCtrl.create({
                  content: 'Please wait..',
                });
                loading.present();
                if (this.locationCity == null || this.locationCountry == null) {
                  let alert = this.alertCtrl.create({
                    title: 'Location Services Disabled',
                    subTitle: 'You need to enter your location first to post an entry, also, make sure location service on your device is turned on',
                    buttons: ['Okay']
                  });
                  alert.present();
                  loading.dismiss();
                }
                else {
                  this.entries.push(
                    {
                      description: this.description,
                      state: this.locationCity,
                      country: this.locationCountry,
                      city: this.locationCity,
                      longitude: this.lat,
                      latitude: this.Lng,
                      entryImageUrl: this.base64Image,
                      entryImageType: "jpg",
                    }
                  );
                  this.storage.ready().then(() => {
                    this.storage.get('session.userId').then(res => {
                      this.storage.get('session.accessToken').then(accessToken => {
                        var headers = {
                          user_id: "" + res,
                          access_token: accessToken
                        }
                        this.joynalApi.creatingEntriesofUser2(res, headers, this.entries,this.date).subscribe(success => {
                          loading.dismiss();
                          if (success.data.achievements) {
                            this.achievements = success.data.achievements;
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
                          else {
                            this.navCtrl.push('AddEntryPage').then(() => {
                            })
                          }
                        }, err => {
                            this.entries = [];
                        })
                      })
                    })
                  })
                }
              }
            },
            {
              text: 'Okay',
              handler: () => {
                let loading = this.loadCtrl.create({
                  content: 'Please wait..',
                });
                loading.present();
                if (this.locationCity == null || this.locationCountry == null) {
                  let alert = this.alertCtrl.create({
                    title: 'Location Disabled',
                    subTitle: 'You need to enter your location first to post an entry, also, make sure location service on your device is turned on',
                    buttons: ['Okay']
                  });
                  alert.present();
                  loading.dismiss();
                }
                else {

                  this.entries.push(
                    {
                      description: this.description,
                      state: this.locationCity,
                      country: this.locationCountry,
                      city: this.locationCity,
                      longitude: this.lat,
                      latitude: this.Lng,
                      entryImageUrl: this.base64Image,
                      entryImageType: ".jpg",
                    }
                  );

                  this.storage.ready().then(() => {
                    this.storage.get('session.userId').then(res => {
                      this.storage.get('session.accessToken').then(accessToken => {
                        var headers = {
                          user_id: "" + res,
                          access_token: accessToken
                        }
                    
                        this.joynalApi.updateUserEntryVisibility(headers, res, 'True').subscribe(entryVisibilityChanged => {
                          this.storage.set('session.isEntryVisible', 'True');
                        })
                        this.joynalApi.creatingEntriesofUser2(res, headers, this.entries,this.date).subscribe(success => {
                          loading.dismiss();
                          if (success.data.achievements) {
                            this.achievements = success.data.achievements;
                            this.navCtrl.push('AddEntryPage').then(() => {
                              let alert = this.alertCtrl.create({
                                title: '<h1 text-center>Did you know</h1>',
                                subTitle: success.data.post,
                                buttons: ['Dismiss']
                              });
                              alert.present();
                              this.entries = [];
                              this.navCtrl.push("AchievementsPage", {
                                achievements: this.achievements
                              });
                            }, err => {
                      
                            })
                          }
                          else {
                            this.navCtrl.push('AddEntryPage');
                          }
                        }, err => {
                            this.entries = [];
                        })
                      })
                    })
                  })
                }
              }
            }
          ]
        });
        alert.present();
      }
    }
  }
  locationError() {
    let alert = this.alertCtrl.create({
      title: '<h1 text-center>Location Services Disabled</h1>',
      subTitle: 'You need to enter your location first to post an entry, also, make sure location service on your device is turned on',
      buttons: ['Okay']
    });
    alert.present();
  }
  locationProceed() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    let loading = this.loadCtrl.create({
      content: 'Locating you, Please wait...'
    });
    loading.present();

    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
      this.lat = (resp.coords.latitude).toString();
      this.Lng = (resp.coords.longitude).toString();
      //getting device pin point location using the obtained lat and long values
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        .then((result: NativeGeocoderReverseResult[]) => this.confirmLocation(JSON.stringify(result[0].locality), JSON.stringify(result[0].countryName), JSON.stringify(result[0].administrativeArea)))
        .catch((error: any) => {
          loading.dismiss();
          this.toast.show(`Joynal could not locate you, make sure location is on`, '3000', 'bottom').subscribe(
            toast => {
            }
          );
        });
      loading.dismiss();


    }).catch((error) => {
      loading.dismiss();
      this.toast.show(`Joynal could not locate you, make sure location is on`, '3000', 'bottom').subscribe(
        toast => {
        }
      );
    });
  }
  getLocation() {
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    let successCallback = (isAvailable) => {
      if (isAvailable == true) {
        this.locationProceed();
        loading.dismiss();
      }
      else {
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if (canRequest) {
            loading.dismiss();
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => this.getLocation(),
              error => {
                this.locationError();
                loading.dismiss();
              }
            );
          }
        });
      }
    };
    let errorCallback = (e) => console.error(e);

    this.diagnostic.isLocationEnabled().then(successCallback).catch(errorCallback);
  }
  confirmLocation(city: string, country: string, state: string) {
    state = state.replace(/['"]+/g, '');
    city = city.replace(/['"]+/g, '');
    country = country.replace(/['"]+/g, '');
    let alert = this.alertCtrl.create({
      title: 'Confirm your location',
      message: city + ', ' + country,
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
            this.locationCity = city;
            this.locationCountry = country;
          }
        }
      ]
    });
    alert.present();
  }
  addingImage() {
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
      ]
    });
    actionSheet.present();
  }
  // Create an array of entries 
  againAddEntry() {
    if (this.description == '' || this.description == null) {
      this.toast.show(`Cannot post empty entry`, '3000', 'center').subscribe(
        toast => {
        }
      );
    }
    else if (this.locationCountry == null || this.locationCity == null) {
      this.alertCtrl.create({
        title: 'Location Services Disabled',
        subTitle: 'You need to enter your location first to post an entry, also, make sure location service on your device is turned on',
        buttons: ['Ok']
      }).present();
    }
    else {
      if (this.base64Image == null || this.base64Image == undefined) {
        this.base64Image = null;
      }
      if (this.locationCity == null || this.locationCity == undefined) {
        this.singleEntryImage = this.base64Image;
        this.singleEntry.push(
          {
            descriptionStuck: this.description,
            image: 'data:image/png;base64,' + this.base64Image,
            todayDate: moment().format('DD'),
            dateMonth: moment().format('MMM'),
            state: '',
          }
        )
        this.entries.push(
          {
            description: this.description,
            state: '',
            country: '',
            city: '',
            longitude: '',
            latitude: '',
            entryImageUrl: this.base64Image,
            entryImageType: ".jpg",
          });
        this.description = '';
        this.base64Image = null;
        this.locationCity = null;
        this.allEntry.push(
          // this.entries,
          this.singleEntry,
          this.singleEntryImage
        )
        this.getEntries.emit(this.allEntry);
        this.EntryImage.emit(this.singleEntryImage);
        this.singleEntry = [];
        this.allEntry = [];
      } else {
        if (this.base64Image == null || this.base64Image == undefined) {
          this.singleEntryImage = this.base64Image;
          this.singleEntry.push(
            {
              descriptionStuck: this.description,
              image: this.base64Image,
              todayDate: moment().format('DD'),
              dateMonth: moment().format('MMM'),
              state: this.locationCity,
            }
          )
          this.entries.push(
            {
              description: this.description,
              state: this.locationCity,
              country: this.locationCountry,
              city: this.locationCity,
              longitude: this.lat,
              latitude: this.Lng,
              entryImageUrl: this.base64Image,
              entryImageType: ".jpg",
            });
          this.description = '';
          this.base64Image = null;
          this.locationCity = null;
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
        else {
          this.singleEntryImage = this.base64Image;
          this.singleEntry.push(
            {
              descriptionStuck: this.description,
              image: 'data:image/png;base64,' + this.base64Image,
              todayDate: moment().format('DD'),
              dateMonth: moment().format('MMM'),
              state: this.locationCity,
            }
          )
          this.entries.push(
            {
              description: this.description,
              state: this.locationCity,
              country: this.locationCountry,
              city: this.locationCity,
              longitude: this.lat,
              latitude: this.Lng,
              entryImageUrl: this.base64Image,
              entryImageType: ".jpg",
            });
          this.description = '';
          this.base64Image = null;
          this.locationCity = null;
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

  }

  // Gallery openGallery for image upload
  async openGallery(): Promise<any> {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: false
    }
    try {
      this.base64Image = await this.camera.getPicture(options); this.imageUpload = true;
      if (this.base64Image != null) {
        this.alertCtrl.create({
          title: 'Image Added',
          subTitle: 'Image has been added to your entry',
          buttons: ['Ok']
        }).present();
      }
    } catch (e) {
    }
  }
  // Camera openCamera for image upload
  async openCamera(): Promise<any> {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    try {
      this.base64Image = await this.camera.getPicture(options); this.imageUpload = true;
      if (this.base64Image != null) {
        this.alertCtrl.create({
          title: 'Image Added',
          subTitle: 'Image has been added to your entry',
          buttons: ['Ok']
        }).present();
      }
    } catch (e) {
      this.testCatch = e;
    }
  }


  ionViewDidLoad() {
    this.getLocation();
  }

}

