import { HttpHeaders } from '@angular/common/http';
import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { LocalNotifications } from "@ionic-native/local-notifications";
import moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html',
  providers : [JoynalApiProvider]  
})

export class HomeScreenPage{ 
  public test : string;
  entries = [];
  title : any;
  description : any;
  date_day : any;
  moment : any;
  noImageThumbnail : string;

  constructor(private localNotify: LocalNotifications,public loadCtrl : LoadingController ,private apiJoynal : JoynalApiProvider,private storage: Storage,public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.noImageThumbnail = './assets/imgs/placeholder-image.png';
   
    console.log( new Date(new Date().getTime()));
  }
  addEntry(){
    this.navCtrl.push("AddEntryPage");
  }
  showImageFull(imageSource:string){
    this.navCtrl.push("ImageviewerPage",{
      imageSource:imageSource
    });
  }
  ionViewCanEnter(){
    this.storage.get('session.isNotificationAllowed').then(isNotificationAllowed => {
      if(isNotificationAllowed.toString() == 'true'){
        this.storage.get('session.reminderTime').then(reminderTime => {
          const date = new Date(`${moment().format('MMMM')} ${moment().format('DD')}, ${moment().format('YYYY')} ${reminderTime}`);
            this.localNotify.schedule({
              title: 'Attention',
              text: 'Its time to add a happy entry in your Joynal diary!',
              data: { mydata: 'My hidden message this is' },
              icon : 'ic_notifications',
              smallIcon : 'ic_notifications',
              trigger: { at:  date},
            })
         })
      }else{
        
      }
     
    })
  let loading  = this.loadCtrl.create({
    content: 'Please wait..',
    });
    loading.present();
    this.storage.get('session.accessToken').then(accessToken => {
      this.storage.get('session.userId').then(userid => {
        var headers = {
          user_id : userid.toString(),
          access_token: accessToken 
        }
        this.apiJoynal.getRandomUserPosts(headers,userid).subscribe(resp => { 
          console.log(resp);
          this.entries = resp.data;
          console.log(this.entries);
          
        })
      })
    })
    if(this.entries!=null){
      loading.dismiss(); 
    }

  }
}

