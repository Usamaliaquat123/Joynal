import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from "@ionic-native/twitter-connect";
@IonicPage()
@Component({
  selector: 'page-start-screen',
  templateUrl: 'start-screen.html',
})
export class StartScreenPage {

  constructor(public twitter :  TwitterConnect,public fb : Facebook,public navCtrl: NavController, public navParams: NavParams) {
  }
  // Bug : todo : fixing tomorrow at developer.facebook.com implementing 28 char hash
  // Facebook Authentication
  fbAuth(){
    this.fb.login(['public_profile', 'user_friends','email']).then((res : FacebookLoginResponse) => console.log('users data' , res));
  }
  // todo : Requesting for twiter developer account the application is under reviewing
  // Twitter Authentication
  twitterAuth(){
    this.twitter.login();
  }
  // todo : Implementing instagram authentication tomorrow
  // Instagram Authentication
  InstaAuth(){

  }

}
