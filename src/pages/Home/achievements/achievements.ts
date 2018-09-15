import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html',
})
export class AchievementsPage{
  achievements : any;
  shareValue : string;
  dayValueStreak : string;
  dayValueCombo : string;
  rewardNameStreak : string;
  rewardNameJIT : string;
  rewardNameCombo : string;
  valueStreak : string;
  valueCombo : string;
  trophyColorStreak : string;
  trophyColorCombo : string;
  trophyColorJIT : string;
  comboName : string;
  dayValue : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform : Platform,private alertCtrl: AlertController) {

    this.achievements = this.navParams.get('achievements');
    if(this.achievements !=null){
      console.log("ok");      
      //console.log("achievement name is this : "+this.achievements.streakachievement.name);
      // this.valueCombo = this.navParams.get('valueCombo');
      // this.valueStreak = this.navParams.get('valueStreak');
      // this.dayValueCombo = this.navParams.get('dayValueCombo');
      // this.dayValueStreak = this.navParams.get('dayValueStreak');
      // this.rewardNameCombo = this.navParams.get('rewardNameCombo');
      // this.rewardNameStreak = this.navParams.get('rewardNameStreak');
      // this.trophyColorCombo = this.navParams.get('trophyColorCombo');
      // this.trophyColorStreak = this.navParams.get('trophyColorStreak');
      console.log(this.achievements);
    }
    else{
      console.log("err");
      let alert = this.alertCtrl.create({
        title: '<h1 text-center>Error</h1>',
        subTitle: 'Could not get your achievement, please try again later.',
        buttons: ['Okay']
      }); 
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementsPage');
  }
  fbShare(){
    this.shareValue = "fb";
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue,
      dayValue: "One"
    });
  }
  instaShare(){
    this.shareValue = "insta";
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue,
      dayValue: "One"
    });
  }
  twitterShare(){
    this.shareValue = "twitter";
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue,
      dayValue: "One"
    });
  }
  fbShareStreak(){
    this.shareValue = "fb";
    if(this.achievements.streakachievement != null){
      if(this.achievements.streakachievement.name == "Bronze Streak"){
        this.dayValue = "5";
      }
      else if(this.achievements.streakachievement.name == "Silver Streak"){
        this.dayValue = "15";
      }
      else if(this.achievements.streakachievement.name == "Gold Streak"){
        this.dayValue = "30";
      }
      else if(this.achievements.streakachievement.name == "Seasonal Streak"){
        this.dayValue = "90";
      }
      else if(this.achievements.streakachievement.name == "Platinum Streak"){
        this.dayValue = "365";
      }
      else if(this.achievements.streakachievement.name == "Ruby Streak"){
        this.dayValue = "500";
      }
      else if(this.achievements.streakachievement.name == "Emerald Streak"){
        this.dayValue = "1,000";
      }
      else if(this.achievements.streakachievement.name == "Sapphire Streak"){
        this.dayValue = "2,000";
      }
      else if(this.achievements.streakachievement.name == "Diamond Streak"){
        this.dayValue = "3,000";
      }
    }
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue,
      dayValue: this.dayValue
    });
  }
  instaShareStreak(){
    this.shareValue = "insta";
    if(this.achievements.streakachievement != null){
      if(this.achievements.streakachievement.name == "Bronze Streak"){
        this.dayValue = "5";
      }
      else if(this.achievements.streakachievement.name == "Silver Streak"){
        this.dayValue = "15";
      }
      else if(this.achievements.streakachievement.name == "Gold Streak"){
        this.dayValue = "30";
      }
      else if(this.achievements.streakachievement.name == "Seasonal Streak"){
        this.dayValue = "90";
      }
      else if(this.achievements.streakachievement.name == "Platinum Streak"){
        this.dayValue = "365";
      }
      else if(this.achievements.streakachievement.name == "Ruby Streak"){
        this.dayValue = "500";
      }
      else if(this.achievements.streakachievement.name == "Emerald Streak"){
        this.dayValue = "1,000";
      }
      else if(this.achievements.streakachievement.name == "Sapphire Streak"){
        this.dayValue = "2,000";
      }
      else if(this.achievements.streakachievement.name == "Diamond Streak"){
        this.dayValue = "3,000";
      }
    }
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue,
      dayValue: this.dayValue
    });
  }
  twitterShareStreak(){
    this.shareValue = "twitter";
    if(this.achievements.streakachievement != null){
      if(this.achievements.streakachievement.name == "Bronze Streak"){
        this.dayValue = "5";
      }
      else if(this.achievements.streakachievement.name == "Silver Streak"){
        this.dayValue = "15";
      }
      else if(this.achievements.streakachievement.name == "Gold Streak"){
        this.dayValue = "30";
      }
      else if(this.achievements.streakachievement.name == "Seasonal Streak"){
        this.dayValue = "90";
      }
      else if(this.achievements.streakachievement.name == "Platinum Streak"){
        this.dayValue = "365";
      }
      else if(this.achievements.streakachievement.name == "Ruby Streak"){
        this.dayValue = "500";
      }
      else if(this.achievements.streakachievement.name == "Emerald Streak"){
        this.dayValue = "1,000";
      }
      else if(this.achievements.streakachievement.name == "Sapphire Streak"){
        this.dayValue = "2,000";
      }
      else if(this.achievements.streakachievement.name == "Diamond Streak"){
        this.dayValue = "3,000";
      }
    }
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue,
      dayValue: this.dayValue
    });
  }
}
