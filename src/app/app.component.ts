import { ForgotPasswordPage } from './../pages/Authentications/forgot-password/forgot-password';
import { SignupPage } from './../pages/Authentications/signup/signup';
import { StartScreenPage } from './../pages/start-screen/start-screen';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/Authentications/login/login";
import firebase from 'firebase'
import { firebaseKeys } from "../config/keys";
// import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})  
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(firebaseKeys.firebaseKeys);
  }
}

