import { ComponentsModule } from './../../../components/components.module';
import { FooterComponent } from './../../../components/UIcomponents/commons/footer/footer';
import { CloudComponent } from './../../../components/UIcomponents/commons/cloud/cloud';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,

  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    ComponentsModule,
  ],
  exports : [
    SignupPage
  ]
})
export class SignupPageModule {}
