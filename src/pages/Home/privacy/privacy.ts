import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private emailComposer: EmailComposer,private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPage');
  }
  contactAdminPrivacyPolicy(){
    let email = {
      to: 'admin@joynalapp.com',
      cc: '',
      subject: 'Joynal-Help',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
  openWebPagePrivacy(){
    const browser = this.iab.create('https://ico.org.uk/global/contact-us/');
  }

}
