import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  segment : 'age-new-pass-setup',
  name : 'age-new-pass-setup'
})
@Component({
  selector: 'page-new-pass-setup',
  templateUrl: 'new-pass-setup.html',
})
export class NewPassSetupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  submitResetPassword(){
    console.log("reset password button has been clicked, reset the user pass here.");
  }
  goBack(){
    this.navCtrl.pop();
  }
}
