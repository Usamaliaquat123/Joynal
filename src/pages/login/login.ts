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
  authfb : any;
  authtweet : any;
  authInsta : any;
  constructor(public twitter :  TwitterConnect,public fb : Facebook,public navCtrl: NavController, public navParams: NavParams) {
    this.authfb = fb.login(['public_profile', 'user_friends','email']);
    this.authtweet = twitter.login();
    this.authInsta = 'etc'
  }

}
