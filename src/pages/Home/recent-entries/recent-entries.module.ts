import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecentEntriesPage } from './recent-entries';

@NgModule({
  declarations: [
    RecentEntriesPage,
  ],
  imports: [
    IonicPageModule.forChild(RecentEntriesPage),
  ],
  exports : [
    RecentEntriesPage
  ]
})
export class RecentEntriesPageModule {}
