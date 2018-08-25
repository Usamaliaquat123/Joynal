import { ComponentsModule } from './../../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementsSharePage } from './achievements-share';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [
    AchievementsSharePage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementsSharePage),
    ComponentsModule,
    HttpClientModule,
    AngularSvgIconModule
  ],
  exports :[
    AchievementsSharePage
  ]
})
export class AchievementsSharePageModule {}
