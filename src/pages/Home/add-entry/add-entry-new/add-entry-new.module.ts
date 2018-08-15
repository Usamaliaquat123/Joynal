import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEntryNewPage } from './add-entry-new';
import { ComponentsModule } from '.././../../../components/components.module';

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
