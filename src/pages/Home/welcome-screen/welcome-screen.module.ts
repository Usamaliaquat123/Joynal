import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeScreenPage } from './welcome-screen';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    WelcomeScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeScreenPage),
    ComponentsModule
  ],
  exports :[
    WelcomeScreenPage
  ]
})
export class WelcomeScreenPageModule {}
