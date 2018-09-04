import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment : 'forgotPass'
})
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers : [JoynalApiProvider]
})
export class ForgotPasswordPage {
  email:any;
  constructor(private joynalApi : JoynalApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }



  goBack(){
    this.navCtrl.pop();
  }
  submitEmail(){
    console.log('todo')
    this.joynalApi.forgotPassword(this.email).subscribe(resp => {
     
    })
  }
}
