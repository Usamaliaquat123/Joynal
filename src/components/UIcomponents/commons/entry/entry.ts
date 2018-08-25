import { Component} from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'entry',
  templateUrl: 'entry.html'
})
export class EntryComponent {
  text: string;

  constructor(private alertCtrl: AlertController) {
    console.log('Hello EntryComponent Component');
    this.text = 'Hello World';
  }
  didYouKnowAchievement(){
    let alert = this.alertCtrl.create({
      title: '<h1 text-center>Did you know</h1>',
      subTitle: '<p text-wrap text-center>Quote about user entry appears here</p>',
      buttons: ['Dismiss']
    }); 
    alert.present();
  }
}
