import { ComponentsModule } from './../../../components/components.module';
import { NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeScreenPage } from './home-screen';

@NgModule({
  declarations: [
    HomeScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeScreenPage),
    ComponentsModule,
  ],
  exports :[
    HomeScreenPage
  ]
})
export class HomeScreenPageModule {}
