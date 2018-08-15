import { Geolocation } from "@ionic-native/geolocation";

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen';

import { TwitterConnect } from '@ionic-native/twitter-connect';

import { JoynalApiProvider } from '../providers/joynal-api/joynal-api';
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from "@ionic-native/keyboard";
import { Deeplinks } from "@ionic-native/deeplinks";
// import { OauthCordova } from "ng2-cordova-oauth/platform/cordova";
// // import { Instagram } from '@ionic-native/instagram';
// import {Instagram } from "ng2-cordova-oauth/core";
@NgModule({
  declarations: [
    MyApp,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   
  ],
  providers: [
    StatusBar,
    Facebook,
    Keyboard,
    //  Instagram,
    // OauthCordova,
    SplashScreen,
    Geolocation,
    Deeplinks,
    TwitterConnect,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JoynalApiProvider
  ]
})
export class AppModule {}
