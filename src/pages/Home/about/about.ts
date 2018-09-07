import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';



@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser,private emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  termsofuse(){
    this.navCtrl.push('PrivacyPage');
  }
  privacypolicy(){
    this.navCtrl.push('TermsPage');
  }
  openEmail(){
    let email = {
      to: 'abcd@gmail.com',
      cc: 'hello@gmail.com',
      subject: 'Joynal-Help',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
}
