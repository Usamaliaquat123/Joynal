import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-start-screen',
  templateUrl: 'start-screen.html',
})
export class StartScreenPage {

  constructor(public fb : Facebook,public navCtrl: NavController, public navParams: NavParams) {
  }

  fbAuth(){
    this.fb.login(['public_profile', 'user_friends','email']).then((res : FacebookLoginResponse) => console.log('users data' , res));
  }


}
