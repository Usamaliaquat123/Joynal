import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-entry-new',
  templateUrl: 'add-entry-new.html',
})
export class AddEntryNewPage {
  public imageSource : string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imageSource = "../../../assets/imgs/icons/camera-picture-dummy.jpg";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryNewPage');
  }
  showImageFull(){
    this.navCtrl.push("ImageviewerPage",{
      imageSource:this.imageSource
    });
  }
}
