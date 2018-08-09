import { FooterComponent } from './../../components/UIcomponents/commons/footer/footer';
import { CloudComponent } from './../../components/UIcomponents/commons/cloud/cloud';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartScreenPage } from './start-screen';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StartScreenPage,

  ],
  imports: [
    IonicPageModule.forChild(StartScreenPage),
    ComponentsModule
  ],
  exports: [
    StartScreenPage
  ]
})
export class StartScreenPageModule {}
