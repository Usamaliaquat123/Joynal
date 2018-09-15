import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { Storage } from "@ionic/storage";



@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(private storage: Storage,public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser,private emailComposer: EmailComposer, public platform : Platform) {
    storage.set('session.currentPage','AboutPage');
    platform.registerBackButtonAction(()=>{
      this.navCtrl.setRoot("HomeScreenPage");
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  termsofuse(){
    this.navCtrl.push('TermsPage');
  }
  privacypolicy(){
    this.navCtrl.push('PrivacyPage');
  }
  openEmail(){
    let email = {
      to: 'admin@joynalapp.com',
      cc: '',
      subject: 'Joynal-Help',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }
  goBack(){
    this.navCtrl.setRoot("HomeScreenPage");
  }
}
