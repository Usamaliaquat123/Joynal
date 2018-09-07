import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyPage } from './privacy';
import { ComponentsModule } from './../../../components/components.module';


@NgModule({
  declarations: [
    PrivacyPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyPage),
    ComponentsModule
  ],
  exports :[
    PrivacyPage
  ]
})
export class PrivacyPageModule {}
