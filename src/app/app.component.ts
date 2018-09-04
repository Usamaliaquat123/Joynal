import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import {LoginPage} from "../pages/Authentications/login/login";
import firebase from 'firebase'
import { firebaseKeys } from "../config/keys";
import { LocalNotifications } from "@ionic-native/local-notifications";

@Component({
  templateUrl: 'app.html'
})  
export class MyApp {
  rootPage:string = "LoginPage";

  constructor(alertCtrl: AlertController,localNotify : LocalNotifications,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    localNotify.on('click').subscribe(notification => {
      let json = JSON.parse(notification.data);
 
      let alert = alertCtrl.create({
        title: notification.title,
        subTitle: json.mydata
      });
      alert.present();
    })
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(firebaseKeys.firebaseKeys);
  }
}

