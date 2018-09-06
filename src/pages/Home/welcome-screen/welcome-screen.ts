import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-welcome-screen',
  templateUrl: 'welcome-screen.html',
})
export class WelcomeScreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeScreenPage');
  }
  swipeLeft(event: any): any {
    this.navCtrl.setRoot('HomeScreenPage');
  }

}
