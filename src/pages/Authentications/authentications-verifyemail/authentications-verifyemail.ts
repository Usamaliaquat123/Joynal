import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostListener } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-authentications-verifyemail',
  templateUrl: 'authentications-verifyemail.html',
})
export class AuthenticationsVerifyemailPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,  test : ElementRef) {
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
  movefocus(nextElement){
    nextElement.focus();
  }
  deleteFocus(previousElement,event: KeyboardEvent){
    if(event.key == "Backspace"){
      previousElement.focus();
    }
  }
}
