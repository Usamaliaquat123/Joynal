

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
// import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';


import { SplashScreen } from '@ionic-native/splash-screen';

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
   
    //  Instagram,
    // OauthCordova,
    SplashScreen,
  
    // IonicImageViewerModule,
    { provide: Camera, useClass: CameraMock },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JoynalApiProvider,
    SocialSharing
  ]
})
export class AppModule {}
