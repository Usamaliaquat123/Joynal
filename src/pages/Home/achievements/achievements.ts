import { ElementRef, Renderer2, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html',
})
export class AchievementsPage{
  trophyColor;
  achievements : any;
  shareValue : string;
  value : string;
  rewardName : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public element: ElementRef, public renderer: Renderer2) {
    this.achievements = this.navParams.data;
    console.log(this.achievements);
    // this.trophyColor = "'width.px':170,'fill':'rgb(150,50,255)','padding.px':1,'margin.px':3";
    //this.test = this.element.nativeElement.getElementsByClassName("st0");
    // console.log(this.test);
    // this.renderer.setElementStyle(this.test, 'fill', '#ff0000');
    //this.renderer.setStyle(this.test, 'webkitTransition', 'margin-top 500ms');
    if(this.achievements.combo.name == "Bronze Combo"){
      this.value = '3';
      this.rewardName = 'Bronze Combo';
      console.log('Bronze Combo');
      this.trophyColor = '#B47237';
    }else if(this.achievements.name == "Bronze Streak"){
      this.rewardName = 'Bronze Streak';
      this.trophyColor = '#01AEF0';
    }else if(this.achievements.name == "Silver Streak"){
      this.rewardName = 'Silver Streak';
      this.trophyColor = '#01AEF0';
    }else if(this.achievements.name == "Welcome Back"){
      this.rewardName = 'Welcome Back';
      this.trophyColor = '#01AEF0';
    }else if(this.achievements.name == "Just in Time"){
      this.rewardName = 'Just in Time';
      this.trophyColor = '#01AEF0';
    }else if(this.achievements.name == "Thanks for Sharing!"){
      this.rewardName = 'Thanks for Sharing!';
      this.trophyColor = '#01AEF0';
    }else if(this.achievements.name == "Thanks for your Feedback!"){
      this.rewardName = 'Thanks for your Feedback!';
      this.trophyColor = '#01AEF0';
    }else if(this.achievements.combo.name == "Silver Combo"){
      this.value = '5';
      this.rewardName = 'Silver Combo';
      this.trophyColor = '#C0C0C0';
    }else if(this.achievements.combo.name == "Gold Combo"){
      this.value = '10';
      this.rewardName = 'Gold Combo';
      this.trophyColor = '#FED700';
    }else if(this.achievements.name == "Gold Streak"){
      this.trophyColor = '#01AEF0';
      this.rewardName = 'Gold Streak';
    }else{
      console.log('dafa ho !');
    }
    // this.trophyColor = '#01AEF0';
    // (this.test.querySelector("st0") as HTMLElement).style.top = '150px';
    //this.test.style = "fill:blue";
    //this.test = this.element.nativeElement.getElementsByTagName('path');
    //this.renderer.addClass(this.element.nativeElement.getElementsByTagName('path'),'.st1');
    //console.log(this.test)
  }

    goBack(){

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AchievementsPage');
  }
  fbShare(){
    this.shareValue = "fb";
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue
    });
  }
  instaShare(){
    this.shareValue = "insta";
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue
    });
  }
  twitterShare(){
    this.shareValue = "twitter";
    this.navCtrl.push("AchievementsSharePage",{
      shareValue:this.shareValue
    });
  }
}
