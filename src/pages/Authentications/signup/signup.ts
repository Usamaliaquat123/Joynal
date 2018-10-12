import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [JoynalApiProvider]
})
export class SignupPage {
  // Importiong social inputs
  authfb: any;
  // authtweet : any;
  authInsta: any;
  testTest: any;
  emailIfExists: any;
  // authfoem intgration
  authForm: FormGroup;
  data: any;
  isItCheck: false;
  response: any;
  errorDetails: any;
  // FormPassword Checker
  passwordType: String = 'password';
  passwordShown: boolean = false;
  confirmPassType: boolean = false;
  passwordTypeConfirm: String = 'password';
  formDirtyName : string;
  formDirtyEmail : string;
  formDirtyPassword : string;
  formDirtyConfirmPassword : string;


  constructor(public loadingCtrl: LoadingController, private alrtCtrl: AlertController, public apiJoynal: JoynalApiProvider, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public element: ElementRef, public renderer: Renderer) {
    this.response = false;
    this.authForm = formBuilder.group({
      'name': [null, Validators.compose([null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z ]+$')])])],
      'email': [null, Validators.compose([null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_]{2,}[.]{1}[a-zA-Z]{2,}')])
      ])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    })


  }

  checkUserExists(email) {

  }

  goBack() {
    this.navCtrl.pop();
  }
  user(email) {
    console.log('trigger');
    this.apiJoynal.checkingUserIfExists(email).subscribe(data => {

    });

  }
  togglePasswordConfirm() {
    if (this.confirmPassType) {
      this.confirmPassType = false;
      this.passwordTypeConfirm = 'password';
    } else {
      this.confirmPassType = true;
      this.passwordTypeConfirm = 'text';
    }
  }
  togglePassword() {
    console.log('clicked');
    if (this.passwordShown) {
      this.passwordShown = false;

      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }
  changeDirtyMessage(){
    this.formDirtyName = "no";
    this.formDirtyEmail = "no";
    this.formDirtyPassword = "no";
    this.formDirtyConfirmPassword = "no";
  }

  userEmailChecking: any;



  async signUp(value) {

    try {
      if (this.authForm.valid) {
        if(this.authForm.get('name').dirty){
          this.formDirtyName = "yes";
        }
        if(this.authForm.get('email').dirty){
          this.formDirtyEmail = "yes";
        }
        if(this.authForm.get('password').dirty){
          this.formDirtyPassword = "yes";
        }
        if(this.authForm.get('confirmPass').dirty){
          this.formDirtyConfirmPassword = "yes";
        }
        if (value.password != value.confirmPass) {
          this.alrtCtrl.create({
            title: 'Password mismatch',
            message: 'Password does not match',
            buttons: ['Dimiss']
          }).present();
        }
        else {
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });

          loading.present();
          await this.apiJoynal.authenticationSignup(value.name, value.email, value.password).subscribe(() => {
            this.apiJoynal.requestRegisterVerification(value.email).subscribe(resp => {
              console.log(resp);
              loading.dismiss();
              this.alrtCtrl.create({
                title: 'Registered Successfully',
                message: 'A verification code has been sent to your email account. Please check your mailbox to complete the registration process',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.navCtrl.push('AuthenticationsVerifyemailPage', value.email);
                    }
                  }
                ]
              }).present();

            }, err => {
              console.log(err);
              loading.dismiss();
              if (err.status == 400) {
                this.alrtCtrl.create({
                  title: 'Already Registered!',
                  message: 'This email is already registered please login.',
                  buttons: [
                    {
                      text: 'Okay',
                      handler: () => {
                        this.navCtrl.setRoot('LoginPage');
                      }

                    }
                  ]
                }).present();
              }
            })
            //this.navCtrl.setRoot('LoginPage');

          }, err => {
            loading.dismiss();
            this.response = true; this.userEmailChecking = "errors"
          });

          //this.presentVerificationPrompt();
        }
      }
      else {
        this.response = true; this.userEmailChecking = "Something missing please check and try again..!";
      }
    } catch{
      this.response = true; this.userEmailChecking = "Please check your connection and try again";
    }


  }

}
