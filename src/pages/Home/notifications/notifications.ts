import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers : [JoynalApiProvider]
})
export class NotificationsPage {
  public notificationToggle:boolean;

  constructor(private joynalApi : JoynalApiProvider,private storage : Storage ,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  notificationsToggleChange() {
    this.storage.ready().then(() => {
      this.storage.get('session.userId').then(userid => {
        this.storage.get('session.accessToken').then(accessToken => {
          this.storage.get('session.isEntryVisible').then(isEntryVisible => {
            this.storage.get('session.reminderTime').then(reminderTime => {
                var headers = {user_id : userid.toString(),access_token: accessToken }
                console.log(this.notificationToggle.toString());
                this.joynalApi.updateUserSettings(headers,userid,reminderTime,isEntryVisible,this.notificationToggle.toString()).subscribe(resp => {
                  console.log(resp);
                })   
            })
          })
        }) 
      })
    })

  }

  ionViewCanEnter(){
    this.storage.ready().then(() => {
      this.storage.get('session.accessToken').then(accessToken => {
        this.storage.get('session.userId').then(userId => {
          var headers = {user_id : userId.toString(),access_token: accessToken }
          this.joynalApi.getUsersInformation(headers,userId).subscribe(resp => {
            console.log(resp);
            this.notificationToggle = resp.data.isNotificationAllowed;
          })
        })
      })
    })
  }
  


}
