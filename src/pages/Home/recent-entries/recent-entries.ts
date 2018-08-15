import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-recent-entries',
  templateUrl: 'recent-entries.html',
  providers : [JoynalApiProvider]
})
export class RecentEntriesPage {
  userId :any;
  constructor( public storage: Storage,public JoynalApi : JoynalApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  async previousUserEntries(){
        this.userId = this.storage.get('session.userId')
        await this.JoynalApi.getListofEntriesOfUser(this.userId).subscribe(data => {
              
        })
  }

}
