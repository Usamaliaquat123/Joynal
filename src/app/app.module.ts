import { StartScreenPage } from './../pages/start-screen/start-screen';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from "@ionic-native/facebook";
import { MyApp } from './app.component';
import { WelcomeScreenComponent } from '../components/StartScreenComponents/welcome-screen/welcome-screen';
import { SplashComponent } from '../components/StartScreenComponents/splash/splash';
@NgModule({
  declarations: [
    MyApp,
    StartScreenPage,
    SplashComponent,
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
    WelcomeScreenComponent
  ],
  providers: [
    StatusBar,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
