import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementsMainPage } from './achievements-main';
import { ComponentsModule } from '.././../../../components/components.module';

@NgModule({
  declarations: [
    AchievementsMainPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementsMainPage),
    ComponentsModule,
    AngularSvgIconModule
  ],
  exports :[
    AchievementsMainPage
  ]
})
export class AchievementsMainPageModule {}
