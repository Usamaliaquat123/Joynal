import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthenticationsVerifyemailPage } from './authentications-verifyemail';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    AuthenticationsVerifyemailPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthenticationsVerifyemailPage),
    ComponentsModule
  ],
  exports: [
    AuthenticationsVerifyemailPage
  ]
})
export class AuthenticationsVerifyemailPageModule {}
