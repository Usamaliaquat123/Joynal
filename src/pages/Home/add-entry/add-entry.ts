
import { Storage } from '@ionic/storage';
import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { entry } from '../../../models/entries';
import moment from 'moment';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
  providers : [JoynalApiProvider]
})
export class AddEntryPage {
  date : any;
  entriesz = [];
  entrix = [];
  constructor(private  loadCtrl: LoadingController,private storage: Storage ,private joynalApi: JoynalApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryPage');
  }

  addNewEntry(){
    this.navCtrl.push("AddEntryNewPage");
  }

  // 
  ionViewCanEnter(){
    this.date =  moment().format('Do MMMM YYYY');
    console.log(this.date);
    let loading = this.loadCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
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
          loading.dismiss();
         this.entriesz  = entries.data;
          console.log(entries);
        }, err=>{
          if(err.status==400){
             this.entriesz = null 
            loading.dismiss();
          }
        })
      })
    })
    })
 
  }
  }

