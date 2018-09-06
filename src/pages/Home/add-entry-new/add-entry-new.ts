import { StatusBar } from '@ionic-native/status-bar';
import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import moment from 'moment';
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-add-entry-new',
  templateUrl: 'add-entry-new.html',
  providers : [JoynalApiProvider]
})
export class AddEntryNewPage {
  entries = [];
  date : any;
  recentEntery = [];
  laoding : any;
  entryImageTest: string;
  noImageThumbnail : string;
  constructor(public loadCtrl : LoadingController,private storage : Storage ,private joynalApi: JoynalApiProvider ,public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
    // this.imageSource = "./assets/imgs/icons/camera-picture-dummy.jpg";
    this.noImageThumbnail = './assets/imgs/placeholder-image.png';
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryNewPage');
  }
  showImageFull(imageSource:string){
    this.navCtrl.push("ImageviewerPage",{
      imageSource:imageSource
    });
  }

  ionViewCanEnter(){
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.storage.ready().then(() => {
      this.storage.get('session.userId').then(userId => {
        this.storage.get('session.accessToken').then(accessToken => {
        console.log(userId);
        var headers = {
          user_id : userId.toString(),
          access_token: accessToken 
        }
        this.joynalApi.getRandomUserPostsAddEntry(headers,userId).subscribe(recentEntery => {
          this.recentEntery  = recentEntery.data;
          console.log(recentEntery);
          loading.dismiss();
        },err => {
          if(err.status == 400){
            loading.dismiss();
            console.log(err);
            this.recentEntery = null;
            console.log(this.recentEntery);
          }
          else{
            loading.dismiss();
            console.log(this.recentEntery);
            let alert = this.alertCtrl.create({
              title: 'Server encountered an error',
              subTitle: 'Server could not respond to the request, please try again later.',
              buttons: ['Dismiss']
            });
            alert.present();
            console.log("this is error code : "+err);
          }
        })
      })
    })
    })
  }

  gettingImageTest(singeEntryImage){
    console.log(singeEntryImage);
    this.entryImageTest = singeEntryImage;
  }
  isEntryChange(entries){
    console.log("hello "+entries);
    this.entries = entries;
    
    this.ionViewDidLoad();
  }


}
