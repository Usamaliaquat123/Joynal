import { AngularSvgIconModule } from 'angular-svg-icon';
import { Geolocation } from "@ionic-native/geolocation";
import { NativeGeocoder } from '@ionic-native/native-geocoder';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Toast } from '@ionic-native/toast';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from "@ionic-native/camera";
import { JoynalApiProvider } from '../providers/joynal-api/joynal-api';
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CameraMock } from "./camera.mock";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Deeplinks } from "../../node_modules/@ionic-native/deeplinks";
import { EmailComposer } from '@ionic-native/email-composer';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';



@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AngularSvgIconModule, 
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
    Facebook,
    //  Instagram,
    // OauthCordova,
    Deeplinks,
    SplashScreen,
    Geolocation,
    LocalNotifications,
    NativeGeocoder,
  { provide: Camera, useClass: CameraMock },
     Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JoynalApiProvider,
    SocialSharing,
    Toast,
    InAppBrowser,
    EmailComposer,
    Diagnostic,
    LocationAccuracy
  ]
})
export class AppModule {}
