import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementsPage } from './achievements';
import { ComponentsModule } from './../../../components/components.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AchievementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementsPage),
    ComponentsModule,
    AngularSvgIconModule,
    HttpClientModule
  ],
  exports :[
    AchievementsPage
  ]
})
export class AchievementsPageModule {}
