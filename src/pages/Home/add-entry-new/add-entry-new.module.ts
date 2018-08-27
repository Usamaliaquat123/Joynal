import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEntryNewPage } from './add-entry-new';


@NgModule({
  declarations: [
    AddEntryNewPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEntryNewPage),
    ComponentsModule
  ],
  exports :[
    AddEntryNewPage
  ]
})
export class AddEntryNewPageModule {}
