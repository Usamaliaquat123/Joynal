import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-add-entry-new',
  templateUrl: 'add-entry-new.html',
  providers : [JoynalApiProvider]
})
export class AddEntryNewPage {
  entries = [];
  date : any;
  recentEntery = [];
  public imageSource : string;
  constructor(private storage : Storage ,private joynalApi: JoynalApiProvider ,public navCtrl: NavController, public navParams: NavParams) {
    this.imageSource = "./assets/imgs/icons/camera-picture-dummy.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryNewPage');
  }
  showImageFull(){
    this.navCtrl.push("ImageviewerPage",{
      imageSource:this.imageSource
    });
  }

  ionViewCanEnter(){
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
         this.recentEntery  = entries.data;
          console.log(entries);
        })
      })
    })
    })
  }


  isEntryChange(entries){
    console.log(entries);
    this.entries = entries;
    // this.date =  moment().format('Do MMMM YYYY');
    this.ionViewDidLoad();
  }


}
