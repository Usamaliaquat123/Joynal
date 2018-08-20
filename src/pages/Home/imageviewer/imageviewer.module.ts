import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageviewerPage } from './imageviewer';
import { ComponentsModule } from './../../../components/components.module';
import { ZoomAreaModule } from 'ionic2-zoom-area';

@NgModule({
  declarations: [
    ImageviewerPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageviewerPage),
    ComponentsModule,
    ZoomAreaModule,
  ],
  exports :[
    ImageviewerPage
  ]
})
export class ImageviewerPageModule {}
