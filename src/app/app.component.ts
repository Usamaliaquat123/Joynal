import { Storage } from '@ionic/storage';
import { ForgotPasswordPage } from './../pages/Authentications/forgot-password/forgot-password';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav,  } from 'ionic-angular';
import firebase from 'firebase'
import { firebaseKeys } from "../config/keys";
import {Deeplinks} from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})  
export class MyApp {
  rootPage:string ;
  welcomeScreen : boolean;
  @ViewChild(Nav) navChild:Nav;
  data : any;
  constructor(deeplinks : Deeplinks,platform: Platform, storage: Storage, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
   
        storage.get('session.welcomePage').then(res => {
          if(res){
            this.rootPage = 'LoginPage'
          }else{
            storage.set('session.welcomePage',this.welcomeScreen = true);
            this.rootPage = 'WelcomeScreenPage';
          }
        });
      statusBar.styleDefault();
      splashScreen.hide();

    deeplinks.routeWithNavController(this.navChild,{
        '/newPass': 'newPass',
        }).subscribe((match) => {
          // this.data = JSON.stringify(match.$args);
          //   console.log(JSON.stringify(match));
            storage.set('session.deeplinkArgs.email', JSON.stringify(match.$args.email)).then(resp => {
              console.log('saved ' + resp);
            }).catch(err => {
              console.log(err)
            });
            storage.set('session.deeplinkArgs.result', JSON.stringify(match.$args.result)).then(resp => {
              console.log('saved ' + resp);
            }).catch(err => {
              console.log(err)
            });

                   
        },nomatch => {
        alert(JSON.stringify(nomatch));
        console.log('Unmatched Route', nomatch);
      })
    });
    firebase.initializeApp(firebaseKeys.firebaseKeys);
  }
}

