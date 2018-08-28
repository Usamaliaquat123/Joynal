import { Geolocation } from "@ionic-native/geolocation";

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from './app.component';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';


import { SplashScreen } from '@ionic-native/splash-screen';

import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Camera } from "@ionic-native/camera";
import { JoynalApiProvider } from '../providers/joynal-api/joynal-api';
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CameraMock } from "./camera.mock";



@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicImageViewerModule,
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
    //  Instagram,
    // OauthCordova,
    SplashScreen,
    Geolocation,
    TwitterConnect,
    IonicImageViewerModule,
    { provide: Camera, useClass: CameraMock },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JoynalApiProvider,
    SocialSharing
  ]
})
export class AppModule {}
