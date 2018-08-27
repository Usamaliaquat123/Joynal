import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-home-screen',
  templateUrl: 'home-screen.html',
})

export class HomeScreenPage{ 
  public imageSource : string;
  public test : string;
  constructor(private storage: Storage,public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.imageSource = "https://www.readersdigest.ca/wp-content/uploads/2011/01/4-ways-cheer-up-depressed-cat.jpg";


  }
  addEntry(){
    this.navCtrl.push("AddEntryPage");
  }
  showImageFull(){
    this.navCtrl.push("ImageviewerPage",{
      imageSource:this.imageSource
    });
  }
}
