import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-imageviewer',
  templateUrl: 'imageviewer.html',
})
export class ImageviewerPage {
  @ViewChild (Navbar) navBar : Navbar; // add this line
  public imageSource : string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imageSource = this.navParams.get('imageSource')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageviewerPage');
    console.log(this.imageSource);
  }

}
