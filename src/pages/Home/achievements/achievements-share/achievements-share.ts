
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-achievements-share',
  templateUrl: 'achievements-share.html',
})
export class AchievementsSharePage {
  public shareValue : string;
  public shareIcon : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private socialSharing: SocialSharing) {
    this.shareValue = this.navParams.get('shareValue');
    console.log(this.shareValue);
    if(this.shareValue == "fb"){
      this.shareIcon = "./assets/icon/fbshare.svg";
    }
    else if(this.shareValue == "insta"){
      this.shareIcon = "./assets/icon/instashare.svg";
    }
    else{
      this.shareIcon = "./assets/icon/twittershare.svg";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementsSharePage');
  }
  socialShare(){
    if(this.shareValue == "fb"){
      console.log("call fb share api here");
      this.socialSharing.shareViaFacebook("hello").then(res =>{
        console.log(res);
      });
    }
    else if(this.shareValue == "insta"){
      console.log("call insta share api here");
      this.socialSharing.shareViaInstagram("This is instagram share test","http://clients2.5stardesigners.net/joynal/api/web/joynal-share-image.jpg").then(res =>{
        console.log("this is instagram share response "+res);
      });
    }
    else{
      this.socialSharing.shareViaTwitter('This is instagram share test','http://clients2.5stardesigners.net/joynal/api/web/joynal-share-image.jpg').then(resp => {
        console.log('Shaing message via twitter' + resp);
      })
    }
  }
  shareWhyMessage(){
    let alert = this.alertCtrl.create({
      title: 'Why you cannot share your entries to social media?',
      subTitle: '<p text-wrap text-center style="color:#424242cf; font-size:1.1em;">Although social media can be a very positive tool for interacting with others, it can also put pressure on you to create posts, and be rewarded with likes and retweets. So although this app allows you to celebrate Streaks and other achievements, I don’t have the option to share the Joynal entries on social media, to avoid putting you under pressure.<br> Your Joynal entries can be shared anonymously to help inspire other users, but all personally identifying information is removed. <br> Of course, if you do have something that made you happy and you want to share it with your social media friends, you can always post it directly onto your social media account.</p>',
      buttons: ['Dismiss']
    }); 
    alert.present();
  }
}
