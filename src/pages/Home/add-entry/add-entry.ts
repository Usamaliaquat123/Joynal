
import { Storage } from '@ionic/storage';
import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { entry } from '../../../models/entries';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
  providers : [JoynalApiProvider]
})
export class AddEntryPage {

  entriesz = [];
  entrix = [];
  constructor(private storage: Storage ,private joynalApi: JoynalApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryPage');
  }

  addNewEntry(){
    this.navCtrl.push("AddEntryNewPage");
  }
  ionViewWillEnter(){
    this.storage.ready().then(() => {
      this.storage.get('session.userId').then(userId => {
        this.storage.get('session.accessToken').then(accessToken => {
        console.log(userId);
        var headers = {
          user_id : userId.toString(),
          access_token: accessToken 
        }
        
        console.log(userId);
        console.log(accessToken);
        this.joynalApi.getListofEntriesOfUser(headers,userId).subscribe(entries => {
         console.log(entries.data);
         console.log(entries);
         this.entriesz  = entries.data;
        //   this.entries.data;
        })
      })
    })
    })
 
  }
  }

