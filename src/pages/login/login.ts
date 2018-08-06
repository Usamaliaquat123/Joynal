import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from "@ionic-native/twitter-connect";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

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
