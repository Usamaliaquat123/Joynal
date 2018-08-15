import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEntryPage } from './add-entry';
import { ComponentsModule } from './../../../components/components.module';


@NgModule({
  declarations: [
    AddEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEntryPage),
    ComponentsModule
  ],
  exports :[
    AddEntryPage
  ]
})
export class AddEntryPageModule {}
