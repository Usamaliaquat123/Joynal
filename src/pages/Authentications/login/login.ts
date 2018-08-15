
import { JoynalApiProvider } from '../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import  firebase from "firebase";
import { Keyboard } from "@ionic-native/keyboard";
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
  constructor(public keyboard : Keyboard,public storage: Storage,public joynalApi : JoynalApiProvider,public formBuilder : FormBuilder,public twitter :  TwitterConnect,public fb : Facebook,public navCtrl: NavController, public navParams: NavParams) {
    keyboard.disableScroll(true);
    this.authfb = fb.login(['public_profile', 'user_friends','email']);
    this.authtweet = twitter.login();
      // Implementing form validations
      this.authForm = formBuilder.group({
        'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
        'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
      })

  }

  async login(value){
    try{
      await this.joynalApi.authenticationLogin(value.email,value.password).subscribe(data => {
        this.data = data.json();
        console.log(data.json());
        this.storage.set('session.accessToken',this.data.token);
        this.storage.set('session.name',this.data.userName);
        this.storage.set('session.email',this.data.userEmail);
        this.storage.set('session.userId',this.data.uid);
        this.storage.set('session.isNotificationAllowed',this.data.isNotificationAllowed);
        this.storage.set('session.isEntryVisible',this.data.isEntryVisible);
        this.navCtrl.push('HomeScreenPage');
       })
    }catch{
      console.log('not connected!');
    }
    
  }

  ionViewCanEnter(){
    this.keyboard.disableScroll(true);
    firebase.auth().onAuthStateChanged(socialUser => {
      if(socialUser) {
        this.navCtrl.push('HomeScreenPage');
      } else {
        this.storage.ready().then(() => {
          this.storage.get('session.accessToken').then(data => {
            if(data !== ''){
              // this.navCtrl.push('HomeScreenPage');
            }
          })
        })
      }
    });
  }


  signUp(){
    this.navCtrl.push('SignupPage');
  }
  forgotPage(){
    this.navCtrl.push("ForgotPasswordPage");
  }
}
