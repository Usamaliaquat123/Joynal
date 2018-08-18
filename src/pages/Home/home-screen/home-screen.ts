import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html',
})

export class HomeScreenPage{ 
  imageSource : String;
  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.imageSource = "https://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg";
  }
  public specialist = "<img [src]=imageSource>";
  addEntry(){
    this.navCtrl.push("AddEntryPage");
  }
  showAlert(imageSource) {
    console.log(imageSource);
    const alert = this.alertCtrl.create({
      subTitle: '<img src=https://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg>'
    });
    alert.present();
  }
}
