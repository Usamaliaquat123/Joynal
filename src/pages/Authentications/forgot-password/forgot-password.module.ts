
import { ForgotPasswordPage } from './forgot-password';
import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
    ForgotPasswordPage,

  ],
  imports: [
    IonicPageModule.forChild(ForgotPasswordPage),
    ComponentsModule
  ],
  exports : [
    ForgotPasswordPage
  ]

})
export class ForgotPasswordPageModule {}
