import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { HostListener } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-authentications-verifyemail',
  templateUrl: 'authentications-verifyemail.html',
  providers : [JoynalApiProvider]
})
@HostListener('document:keypress', ['$event'])
export class AuthenticationsVerifyemailPage {
  email : any;
  verifyForm : FormGroup;
  value1 : any;
  value2 : any;
  value3 : any;
  value4 : any;
  value5 : any;
  value6 : any;
  verifyCode : any;
  constructor(private alertCtrl: AlertController,private joynalAoi : JoynalApiProvider,public formBuilder : FormBuilder,public navCtrl: NavController, public navParams: NavParams, public platform : Platform) {
    this.email = navParams.data;
    this.verifyForm = formBuilder.group({
      'code' : [null, Validators.compose([Validators.required])],
    })
    platform.registerBackButtonAction(()=>{
      this.navCtrl.setRoot("LoginPage");
    })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AuthenticationsVerifyemailPage');
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
  verify(){

    this.verifyCode = this.value1 + this.value2 + this.value3 + this.value4 + this.value5 + this.value6;
    if(this.value1 == '' || this.value1 == undefined || this.value2 == '' || this.value2 == undefined || this.value3 == '' || this.value3 == undefined || this.value4 == '' || this.value4 == undefined || this.value5 == '' || this.value5 == undefined || this.value6 == '' || this.value6 ==  undefined){
      this.alertCtrl.create({
        title : 'Verification Code Invalid',
        message : 'Please make sure all fields are set',
        buttons : [
          {
            text : 'Okay',
          }     
        ]
      }).present();
    }else{
      console.log(this.verifyCode)
      this.joynalAoi.verificationEmail(this.email,this.verifyCode).subscribe(resp => {
        this.alertCtrl.create({
          title : 'Verification Successful',
          message : 'Your account has been verified. Please login and enjoy Joynal',
          buttons : [
            {
              text : 'Okay',
              handler : () =>{
                this.navCtrl.setRoot('LoginPage');
              } 
            }
          ]
        }).present();
      },err => {
        if(err.status == 400){
          this.alertCtrl.create({
            title : 'Verification Code Invalid',
            message : 'Verification code you provided is invalid or expired',
            buttons : [
              {
                text : 'Change Email',
                handler : () =>{
                  this.navCtrl.pop();
                } 
              },
              {
                text : 'Resend',
                handler : () => {
                  this.joynalAoi.requestRegisterVerification(this.email).subscribe(() => { console.log('resended!')});
                }
              },
           
            ]
          }).present();
        }
        if(err.status == 500){
          this.alertCtrl.create({
            title : 'Switch off your app !',
            message : 'Please switch off app completely and restart again.',
            buttons : [
             
              {
                text : 'Switch Off',
                handler : () => {
                  this.joynalAoi.requestRegisterVerification(this.email).subscribe(resendEmail => {
                    console.log('resended');
                  })
                }
              },
           
            ]
          }).present();
        }
      })
    }
  
  }
  goBack(){
    this.navCtrl.setRoot("LoginPage");
  }
}
