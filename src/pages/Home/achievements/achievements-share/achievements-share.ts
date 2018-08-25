import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-achievements-share',
  templateUrl: 'achievements-share.html',
})
export class AchievementsSharePage {
  public shareValue : string;
  public shareIcon : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.shareValue = this.navParams.get('shareValue');
    console.log(this.shareValue);
    if(this.shareValue == "fb"){
      this.shareIcon = "../../../assets/icon/fbshare.svg";
    }
    else if(this.shareValue == "insta"){
      this.shareIcon = "../../../assets/icon/instashare.svg";
    }
    else{
      this.shareIcon = "../../../assets/icon/twittershare.svg";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementsSharePage');
  }
  socialShare(){
    if(this.shareValue == "fb"){
      console.log("call fb share api here");
    }
    else if(this.shareValue == "insta"){
      console.log("call insta share api here");
    }
    else{
      console.log("call twitter share api here");
    }
  }
  shareWhyMessage(){
    let alert = this.alertCtrl.create({
      title: 'Why you cannot share your entries to social media?',
      subTitle: '<p text-wrap text-center style="color:#424242cf; font-size:1.1em;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
      buttons: ['Dismiss']
    }); 
    alert.present();
  }
}
