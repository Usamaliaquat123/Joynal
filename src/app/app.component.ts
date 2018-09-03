import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {LoginPage} from "../pages/Authentications/login/login";
import firebase from 'firebase'
import { firebaseKeys } from "../config/keys";
import { Storage } from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})  
export class MyApp {
  rootPage:string ;
  welcomeScreen : boolean;
  constructor(storage : Storage,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      storage.get('session.welcomePage').then(res => {
        if(res){
          this.rootPage = 'LoginPage'
        }else{
          storage.set('session.welcomePage',this.welcomeScreen = true);
          this.rootPage = 'WelcomeScreenPage';
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(firebaseKeys.firebaseKeys);
  }
}

