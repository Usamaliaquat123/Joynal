import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagemodalPage } from './imagemodal';

@NgModule({
  declarations: [
    ImagemodalPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagemodalPage),
  ],
  exports :[
    ImagemodalPage,
  ]
})
export class ImagemodalPageModule {}
