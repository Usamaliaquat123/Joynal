import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPassSetupPage } from './new-pass-setup';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    NewPassSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPassSetupPage),
    ComponentsModule
  ],
  exports : [
    NewPassSetupPage
  ]
})
export class NewPassSetupPageModule {}
