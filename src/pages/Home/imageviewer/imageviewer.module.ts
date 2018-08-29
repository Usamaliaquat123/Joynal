import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageviewerPage } from './imageviewer';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    ImageviewerPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageviewerPage),
    ComponentsModule,
  ],
  exports :[
    ImageviewerPage
  ]
})
export class ImageviewerPageModule {}
