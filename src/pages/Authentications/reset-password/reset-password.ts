import { FormBuilder } from '@angular/forms';
import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers: [JoynalApiProvider]
})
export class ResetPasswordPage {
  email: any;
  verifyForm: FormGroup;
  value1: any;
  value2: any;
  value3: any;
  value4: any;
  value5: any;
  value6: any;
  verifyCode: any;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private joynalAoi: JoynalApiProvider, public formBuilder: FormBuilder, public platform: Platform) {
    this.email = navParams.get('email');
    this.verifyForm = formBuilder.group({
      'code': [null, Validators.compose([Validators.required])],
    })
    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot("LoginPage");
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  goBack() {
    this.navCtrl.setRoot("LoginPage");
  }
  handleKeyboardEvent(event: KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  movefocus(nextElement) {
    nextElement.focus();
  }
  deleteFocus(previousElement, event: KeyboardEvent) {
    if (event.key == "Backspace") {
      previousElement.focus();
    }
  }
  verify() {

    this.verifyCode = this.value1 + this.value2 + this.value3 + this.value4 + this.value5 + this.value6;
    if (this.value1 == '' || this.value1 == undefined || this.value2 == '' || this.value2 == undefined || this.value3 == '' || this.value3 == undefined || this.value4 == '' || this.value4 == undefined || this.value5 == '' || this.value5 == undefined || this.value6 == '' || this.value6 == undefined) {
      this.alertCtrl.create({
        title: 'Verification Code Invalid',
        message: 'Please make sure all fields are set',
        buttons: [
          {
            text: 'Okay',
          }
        ]
      }).present();
    } else {
      console.log(this.verifyCode)
      this.joynalAoi.verificationEmailResetPassword(this.email, this.verifyCode).subscribe(resp => {
        this.alertCtrl.create({
          title: '<h1 text-center>Verification Successful</h1>',
          subTitle: 'Press okay to continue',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.navCtrl.push('NewPassSetupPage', {
                  email: this.email
                });
              }
            }
          ]
        }).present();
      }, err => {
        if (err.status == 400) {
          this.alertCtrl.create({
            title: 'Verification Code Invalid',
            message: 'Verification code you provided is invalid or expired',
            buttons: [
              {
                text: 'Cancel',
                handler: () => {
                  this.navCtrl.pop();
                }
              },
              {
                text: 'Resend Code',
                handler: () => {
                  this.joynalAoi.forgotPassword(this.email).subscribe(resp => {
                    let alert = this.alertCtrl.create({
                      title: '<h1 text-center>Password Recovery</h1>',
                      subTitle: 'A Password Recovery Email has been sent to your email address',
                      buttons: ['Okay']
                    });
                    alert.present();

                  }, err => {
                    let alert = this.alertCtrl.create({
                      title: '<h1 text-center>Error</h1>',
                      subTitle: 'Email not found or the server could not respond, please try again',
                      buttons: ['Okay']
                    });
                    alert.present();
                  })
                }
              },

            ]
          }).present();
        }
        if (err.status == 500) {
          this.alertCtrl.create({
            title: 'Restart the app',
            message: 'Please switch off app completely and start again.',
            buttons: [

              {
                text: 'Switch Off',
                handler: () => {
                  this.joynalAoi.requestRegisterVerification(this.email).subscribe(resendEmail => {
                    console.log('resent');
                  })
                }
              },

            ]
          }).present();
        }
      })
    }

  }

}
