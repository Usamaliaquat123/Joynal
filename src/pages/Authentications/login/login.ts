
import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import  firebase from "firebase";

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
  constructor(public storage :Storage,public joynalApi : JoynalApiProvider,public formBuilder : FormBuilder,public twitter :  TwitterConnect,public fb : Facebook,public navCtrl: NavController, public navParams: NavParams) {
    this.authfb = fb.login(['public_profile', 'user_friends','email']);
    this.authtweet = twitter.login();
      // this.authInsta = insta.isInstalled().then(res => {
      //   console.log(` information about ${res}`)
      // })

      // Implementing form validations
      this.authForm = formBuilder.group({
        'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
        'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
      })

  }

  login(value){
      console.log(value);
    
    const val = value;
     this.joynalApi.authenticationLogin(val.email,val.password).subscribe(data => {
       console.log(data);
     })
  }

  ionViewCanEnter(){
    // this.storage.ready().then(() => {
    //     this.storage.get('').then(data => {

    //     })
    // })
    // var that = this
    // firebase.auth().onAuthStateChanged(socialUser => {
    
    //   if (socialUser) {
        
    //   } else {
    //     this.storage.ready().then(() => {
    //       this.storage.get('access_token').then(data => {
    //         if(data !== ''){

    //         }
    //       })
    //     })
    //   }
    // });
  }


  signUp(){
    this.navCtrl.push('SignupPage');
  }
  forgotPage(){
    this.navCtrl.push("ForgotPasswordPage");
  }
}
