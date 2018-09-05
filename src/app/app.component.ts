import { ForgotPasswordPage } from './../pages/Authentications/forgot-password/forgot-password';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { Platform,  } from 'ionic-angular';
import firebase from 'firebase'
import { firebaseKeys } from "../config/keys";
import {Deeplinks} from '@ionic-native/deeplinks';
import { NewPassSetupPage } from '../pages/Authentications/new-pass-setup/new-pass-setup';
@Component({
  templateUrl: 'app.html'
})  
export class MyApp {
  rootPage:string = 'LoginPage';
  welcomeScreen : boolean;
  constructor(deeplinks : Deeplinks,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
   
        // storage.get('session.welcomePage').then(res => {
        //   if(res){
        //     this.rootPage = 'LoginPage'
        //   }else{
        //     storage.set('session.welcomePage',this.welcomeScreen = true);
        //     this.rootPage = 'WelcomeScreenPage';
        //   }
        // });
      statusBar.styleDefault();
      splashScreen.hide();

      deeplinks.route({
        
      }).subscribe((match) => {
        alert(JSON.stringify(match))
        this.rootPage  = 'page-new-pass-setup';
      },(nomatch) => {
        alert(JSON.stringify(nomatch));
      })
    });
    firebase.initializeApp(firebaseKeys.firebaseKeys);
  }
}

