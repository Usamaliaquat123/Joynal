import { ComponentsModule } from './../../../components/components.module';
import { FooterComponent } from './../../../components/UIcomponents/commons/footer/footer';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { CloudComponent } from '../../../components/UIcomponents/commons/cloud/cloud';

@NgModule({
  declarations: [
    LoginPage,

  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    ComponentsModule
  ],
  exports : [
    LoginPage
  ]

})
export class LoginPageModule {}
