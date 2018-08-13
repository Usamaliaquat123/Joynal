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

  constructor( public storage: Storage,public JoynalApi : JoynalApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  previousUserEntries(){
        this.storage.get('session.userId ')
        this.JoynalApi.getListofEntriesOfUser()
  }

}
