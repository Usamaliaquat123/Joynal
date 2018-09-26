
import { JoynalApiProvider } from '../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import  firebase from "firebase";
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [JoynalApiProvider]
})
export class LoginPage {
  // Inputs of footer components
  authfb : any;
  authtweet : any;
  authInsta : any;

  // authfoem intgration
  authForm : FormGroup;
  data : any;
  isChecked : boolean;
  passwordType : string = 'password'
  passwordShown : boolean = false;
  response : boolean;
  responseText : any;
  constructor(private alrtCtrl : AlertController,public storage: Storage,public joynalApi : JoynalApiProvider,public formBuilder : FormBuilder,public navCtrl: NavController, public navParams: NavParams, private toast: Toast, public platform: Platform) {
    platform.registerBackButtonAction(()=>{
      platform.exitApp();
    })  
    this.response = false;
      // Implementing form validations
      this.authForm = formBuilder.group({
        'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
        'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
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
   toogleRememberMe(){
     if(this.isChecked == true){
      this.isChecked = false;
    }else{
       this.isChecked = true;
      
    }
  }
  async login(value){
    console.log('trigger login');
    try{
      if(this.authForm.valid){
          await this.joynalApi.authenticationLogin(value.email,value.password).subscribe(data => {
            const that = this;
            this.data  = data.json();
            if(this.data.data.userEmail == 'Unverified'){
              //  Todo : If it is unverified
              this.joynalApi.requestRegisterVerification(value.email).subscribe(sendVerification => {
                this.alrtCtrl.create({
                  title : 'Verification',
                  message : 'A verification code has sent to your email, please check your email and verify your email to complete your registration process',
                  buttons : [
               
                    {
                      text : 'Ok!',
                      handler : () => {
                        this.joynalApi.requestRegisterVerification(value.email).subscribe(() => { console.log('resended!'); this.navCtrl.push('AuthenticationsVerifyemailPage', value.email)});
                      }
                    },
                 
                  ]
                }).present();
              })  
            }else{
              if(this.isChecked == true){
                this.data = data.json();
                console.log(this.data);
                this.storage.set('session.rememberme', true);
                this.storage.set('session.accessToken',this.data.data.token);
                this.storage.set('session.name',this.data.data.userName);
                this.storage.set('session.email',this.data.data.userEmail);
                this.storage.set('session.userPass', value.password);
                this.storage.set('session.userId',this.data.data.userId);
                this.storage.set('session.isNotificationAllowed',this.data.data.isNotificationAllowed);
                this.storage.set('session.isEntryVisible',this.data.data.isEntryVisible);
                this.storage.set('session.reminderTime',this.data.data.reminderTime);
                this.navCtrl.setRoot('HomeScreenPage');
            }else{
              this.data = data.json();
                this.storage.set('session.accessToken',this.data.data.token);
                this.storage.set('session.name',this.data.data.userName);
                this.storage.set('session.email',this.data.data.userEmail);
                this.storage.set('session.userPass', value.password);
                this.storage.set('session.userId',this.data.data.userId);
                this.storage.set('session.isNotificationAllowed',this.data.data.isNotificationAllowed);
                this.storage.set('session.isEntryVisible',this.data.data.isEntryVisible);
                this.storage.set('session.reminderTime',this.data.data.reminderTime);
                this.navCtrl.setRoot('HomeScreenPage');
            }
            }
            // console.log(data.json());
            
        },err => {
          // console.log(err.json());
          if(err.json().error.status  = '400'){
            this.response = true;
            this.toast.show(`Credentials are not valid, please register and try again`, '3000', 'bottom').subscribe(toast => { console.log(toast);});}
        });  
      }else{this.response = true;this.toast.show(`Please check credentials and try again`, '3000', 'bottom').subscribe(toast => {console.log(toast);});
      }
    }catch{
      console.log('not connected to the internet!!');
      this.toast.show(`Please check your internet connection and try again`, '3000', 'bottom').subscribe(toast => {console.log(toast);});
    }
  }

  ionViewCanEnter(){
    firebase.auth().onAuthStateChanged(socialUser => {
      if(socialUser) {
        this.navCtrl.setRoot('HomeScreenPage');
      } else {
        this.storage.ready().then(() => {
          this.storage.get('session.rememberme').then(data => {
            if(data !==  '' && data !== null){
              this.navCtrl.setRoot('HomeScreenPage');
          } 
          })
        })
      }
    });
  }
  signUp(){this.navCtrl.push('SignupPage');}
  forgotPage(){this.navCtrl.push("ForgotPasswordPage");}
}
