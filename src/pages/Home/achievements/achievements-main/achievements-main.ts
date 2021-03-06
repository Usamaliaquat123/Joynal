import { JoynalApiProvider } from './../../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-achievements-main',
  templateUrl: 'achievements-main.html',
  providers : [JoynalApiProvider]
})
export class AchievementsMainPage {
  achievements = [];
  color : String;
  constructor(private storage : Storage,private joynalApi: JoynalApiProvider,public navCtrl: NavController, public navParams: NavParams, public platform : Platform) {
    this.achievements = this.navParams.data;
    storage.set('session.currentPage','AchievementsMainPage');
    platform.registerBackButtonAction(()=>{
      this.navCtrl.setRoot("HomeScreenPage");
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementsMainPage');
    
  }
  test(){
    this.navCtrl.push("AchievementsPage");
  }
  ionViewCanEnter(){
 


    this.storage.get('session.userId').then(userid => {
      this.storage.get('session.accessToken').then(accesstoken => {
        var headers = {
          user_id : userid.toString(),
          access_token: accesstoken 
        }
        this.joynalApi.getUserAchievement(headers,userid).subscribe(resp => {
          console.log(resp);
          this.achievements = resp;
        })
      })
    })

  }
  goBack(){
    this.navCtrl.setRoot("HomeScreenPage");
  }
}
