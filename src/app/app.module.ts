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
@NgModule({
  declarations: [
    MyApp,
    StartScreenPage,
    SplashComponent,
    FooterComponent,
    LoginPage,
    CloudComponent,
WelcomeScreenComponent
  ],
  imports: [
    BrowserModule,
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
    WelcomeScreenComponent
  ],
  providers: [
    StatusBar,
    Facebook,
    SplashScreen,
    TwitterConnect,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
