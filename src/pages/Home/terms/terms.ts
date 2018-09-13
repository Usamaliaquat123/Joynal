import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }
  adminEmailCompose(){
    let email = {
      to: 'admin@joynalapp.com',
      cc: '',
      subject: 'Joynal-Help',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

}
