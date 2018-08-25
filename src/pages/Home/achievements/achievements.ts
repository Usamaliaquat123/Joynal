import { ElementRef, Renderer2, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html',
})
export class AchievementsPage{
  trophyColor;
  shareValue : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public element: ElementRef, public renderer: Renderer2) {
    // this.trophyColor = "'width.px':170,'fill':'rgb(150,50,255)','padding.px':1,'margin.px':3";
    //this.test = this.element.nativeElement.getElementsByClassName("st0");
    // console.log(this.test);
    // this.renderer.setElementStyle(this.test, 'fill', '#ff0000');
    //this.renderer.setStyle(this.test, 'webkitTransition', 'margin-top 500ms');
    this.trophyColor = '#01AEF0';
    // (this.test.querySelector("st0") as HTMLElement).style.top = '150px';
    //this.test.style = "fill:blue";
    //this.test = this.element.nativeElement.getElementsByTagName('path');
    //this.renderer.addClass(this.element.nativeElement.getElementsByTagName('path'),'.st1');
    //console.log(this.test)
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
