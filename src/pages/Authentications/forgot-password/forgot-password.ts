import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@IonicPage({
  segment : 'forgotPass'
})
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers : [JoynalApiProvider]
})
export class ForgotPasswordPage {
  forgotPasswordForm : FormGroup;
  email:any;
  constructor(private joynalApi : JoynalApiProvider,public navCtrl: NavController, public navParams: NavParams,public formBuilder : FormBuilder,private alertCtrl: AlertController) {
    this.forgotPasswordForm = formBuilder.group({
      'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])]
    })
  }

  goBack(){
    this.navCtrl.pop();
  }
  forgotpassword(value){
    console.log(value);
    if(this.email !=null){
      this.joynalApi.forgotPassword(this.email).subscribe(resp => {
        let alert = this.alertCtrl.create({
          title: '<h1 text-center>Password Recovery</h1>',
          subTitle: 'A Password Recovery Email has been sent to your email address',
          buttons: ['Okay']
        }); 
        alert.present();
      
      })
    }
    else{
      let alert = this.alertCtrl.create({
        title: '<h1 text-center>Email Invalid</h1>',
        subTitle: 'Please make sure you enter your email address before proceeding',
        buttons: ['Okay']
      }); 
      alert.present();
    }
  }
  
}
