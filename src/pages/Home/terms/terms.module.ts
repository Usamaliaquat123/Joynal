import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsPage } from './terms';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    TermsPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsPage),
    ComponentsModule
  ],
  exports :[
    TermsPage
  ]
})
export class TermsPageModule {}
