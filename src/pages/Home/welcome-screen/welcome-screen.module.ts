import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeScreenPage } from './welcome-screen';
import { ComponentsModule } from './../../../components/components.module';
import { IonicSwipeAllModule } from 'ionic-swipe-all';

@NgModule({
  declarations: [
    WelcomeScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeScreenPage),
    ComponentsModule,
    IonicSwipeAllModule 
  ],
  exports :[
    WelcomeScreenPage
  ]
})
export class WelcomeScreenPageModule {}
