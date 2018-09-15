import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
@IonicPage({
  segment : 'newPass',
  name : 'newPass'
})
@Component({
  selector: 'page-new-pass-setup',
  templateUrl: 'new-pass-setup.html',
  providers : [JoynalApiProvider]
})
export class NewPassSetupPage {
  newPass  : any;
  newPassConfirm : any;
  email : any; 
  resetPassForm : FormGroup;
  data : any;
  passwordType : string = 'password';
  passwordType2 : string = 'password'
  passwordShown : boolean = false;
  passwordShown2 : boolean = false;
  constructor(public alertCtrl : AlertController,public storage: Storage,public formBuilder : FormBuilder,private joynalApi: JoynalApiProvider,public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
    platform.registerBackButtonAction(()=>{
      this.navCtrl.pop();
    })
    console.log(` ${this.email}`);
    this.resetPassForm = formBuilder.group({
      'password':  [null, Validators.compose([Validators.required, Validators.minLength(8) ])],
      'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])] 
    })
    
  }
  resetPass(value){
    this.storage.get('session.deeplinkArgs.email').then(email => {
      if(this.resetPassForm.valid){
        console.log(email);
        email = email.replace(/['"]+/g, '');
        this.joynalApi.resetPassworDeeplink(email,value.password).subscribe(resp => {
          let alert = this.alertCtrl.create({
            title: '<h1 text-center>Password Changed</h1>',
            subTitle: 'Your password has been changed successfully',
            buttons: ['Okay']
          }); 
          alert.present();
          this.navCtrl.setRoot("LoginPage");
        }, err=>{
          let alert = this.alertCtrl.create({
            title: '<h1 text-center>Error</h1>',
            subTitle: 'Email not found or the server could not respond, please try again',
            buttons: ['Okay']
          }); 
          alert.present();
        })
      }else{
        let alert = this.alertCtrl.create({
          title: '<h1 text-center>Password</h1>',
          subTitle: 'New password not valid',
          buttons: ['Okay']
        }); 
        alert.present();
      }
    }, err=>{
      let alert = this.alertCtrl.create({
        title: '<h1 text-center>Error</h1>',
        subTitle: 'Email not found or the server could not respond, please try again',
        buttons: ['Okay']
      }); 
      alert.present();
    })
    
  
  }
  goBack(){
    this.navCtrl.pop();
  }
  ionViewDidEnter(){
    this.storage.get('session.deeplinkArgs.result').then(result => {
      if(result == 'false'){
        let alert = this.alertCtrl.create({
          title: '<h1 text-center>Link has been expired</h1>',
          subTitle: 'Reset password link has been expired',
          buttons: [
            {
              text : 'Okay',
              handler : () => {
                this.navCtrl.setRoot('LoginPage');
              }
            }
          ]
        }); 
        alert.present();
      }
    })
  }
  togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }
  togglePassword2(){
    if(this.passwordShown2){
      this.passwordShown2 = false;
      this.passwordType2 = 'password';
    }else{
      this.passwordShown2 = true;
      this.passwordType2 = 'text';
    }
  }

}
