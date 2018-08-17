import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  public notificationToggle:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notificationToggle=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  notificationsToggleChange() {
    console.log(this.notificationToggle);

  }

}
