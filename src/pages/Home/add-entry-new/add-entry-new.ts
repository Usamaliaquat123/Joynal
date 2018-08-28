import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-add-entry-new',
  templateUrl: 'add-entry-new.html',
  providers : [JoynalApiProvider]
})
export class AddEntryNewPage {
  entries = [];
  date : any;
  public imageSource : string;
  constructor(private joynalApi: JoynalApiProvider ,public navCtrl: NavController, public navParams: NavParams) {
    this.imageSource = "../../../assets/imgs/icons/camera-picture-dummy.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryNewPage');
    console.log('asdasdasd');
  }
  showImageFull(){
    this.navCtrl.push("ImageviewerPage",{
      imageSource:this.imageSource
    });
  }
  ionViewWillEnter(){
   
  }

  isEntryChange(entries){
    console.log(entries);
    this.entries = entries;
    // this.date =  moment().format('Do MMMM YYYY');
    this.ionViewDidLoad();
  }


}
