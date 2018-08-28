import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html',
  providers : [JoynalApiProvider]  
})

export class HomeScreenPage{ 
  public imageSource : string;
  public test : string;
  entries = [];
  title : any;
  description : any;
  date_day : any;
  moment : any;
  constructor(private apiJoynal : JoynalApiProvider,private storage: Storage,public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController) {
     this.imageSource = "https://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg";


  }
  addEntry(){
    this.navCtrl.push("AddEntryPage");
  }
  showImageFull(){
    this.navCtrl.push("ImageviewerPage",{
      imageSource:this.imageSource
    });
  }


  ionViewCanEnter(){
    this.storage.get('session.accessToken').then(accessToken => {
      this.storage.get('session.userId').then(userid => {
        var headers = {
          user_id : userid.toString(),
          access_token: accessToken 
        }
        this.apiJoynal.getRandomUserPosts(headers,userid).subscribe(resp => {
          console.log(resp.data);
          this.entries = resp.data;
         
        })
      })
    })

  }

}

