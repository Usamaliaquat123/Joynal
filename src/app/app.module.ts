import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StartScreenPage } from './../pages/start-screen/start-screen';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from './app.component';
import { WelcomeScreenComponent } from '../components/StartScreenComponents/welcome-screen/welcome-screen';
import { SplashComponent } from '../components/StartScreenComponents/splash/splash';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FooterComponent } from '../components/footer/footer';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { LoginPage } from '../pages/login/login';
import { CloudComponent } from '../components/UIcomponents/cloud/cloud';
import { JoynalApiProvider } from '../providers/joynal-api/joynal-api';
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';
import { SignupPage } from '../pages/signup/signup';
// import { OauthCordova } from "ng2-cordova-oauth/platform/cordova";
// // import { Instagram } from '@ionic-native/instagram';
// import {Instagram } from "ng2-cordova-oauth/core";

@NgModule({
  declarations: [
    MyApp,
    StartScreenPage,
    SplashComponent,
    FooterComponent,
    LoginPage,
    CloudComponent,
WelcomeScreenComponent,
SignupPage
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
    StartScreenPage,
    SplashComponent,
    FooterComponent,
    LoginPage,
    CloudComponent,
    WelcomeScreenComponent,
    SignupPage
  ],
  providers: [
    StatusBar,
    Facebook,
    //  Instagram,
    // OauthCordova,
    SplashScreen,
    TwitterConnect,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JoynalApiProvider
  ]
})
export class AppModule {}
