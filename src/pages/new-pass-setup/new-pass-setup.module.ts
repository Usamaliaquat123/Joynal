import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPassSetupPage } from './new-pass-setup';

@NgModule({
  declarations: [
    NewPassSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPassSetupPage),
  ],
})
export class NewPassSetupPageModule {}
