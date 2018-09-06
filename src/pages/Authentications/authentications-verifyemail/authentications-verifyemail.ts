import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostListener } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-authentications-verifyemail',
  templateUrl: 'authentications-verifyemail.html',
})
@HostListener('document:keypress', ['$event'])
export class AuthenticationsVerifyemailPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationsVerifyemailPage');
  }
  handleKeyboardEvent(event: KeyboardEvent) { 
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

}
