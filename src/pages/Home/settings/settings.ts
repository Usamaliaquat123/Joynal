import { Toast } from '@ionic-native/toast';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers : [JoynalApiProvider]
})
export class SettingsPage {
  public entryVisibilityToggle:boolean;
  userName : any;
  reminderTime : any;
  passwordTest : string;
  constructor(private localNotify : LocalNotifications,private storage : Storage,private joynalApi : JoynalApiProvider,private alertCtrl : AlertController,public navCtrl: NavController, public navParams: NavParams, public platform: Platform,private toast: Toast) {
    storage.set('session.currentPage','SettingsPage');
    platform.registerBackButtonAction(()=>{
      this.navCtrl.setRoot("HomeScreenPage");
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
 


  // Changing Name
  editName(){
    this.alertCtrl.create({
      title : 'Edit',
      inputs : [
        {
          type : 'text',
          placeholder : this.userName.toString(),
          name : 'userName'      
        }
      ],
      buttons : [
        {
          text : 'Save',
          handler : (data) => {
            this.storage.ready().then(() => {
              this.storage.get('session.userId').then(userid => {
                this.storage.get('session.accessToken').then(access_Token => {
                  var headers = {
                    user_id : userid.toString(),
                    access_token: access_Token }
                  this.joynalApi.updateUserName(userid,data.userName,headers).subscribe(response => {
                    this.ionViewCanEnter();
                  })
                  
                })
              
              })
            })
    
          }
        }
      ]

    }).present();
  }
  // Changing Pass
  editPass(){
    this.alertCtrl.create({
      title : 'Change Password',
      inputs : [
        {
          type : 'password',
          placeholder : 'Current password',
          name : 'currentUserPass'      
        },
        {
          type : 'password',
          placeholder : 'New password',
          name : 'newUserPass'      
        },
        {
          type : 'password',
          placeholder : 'Confirm password',
          name : 'newUserPassConfirm'      
        }
      ],
      buttons : [
        {
          text : 'Save',
          handler : (data) => {
            this.storage.ready().then(() => {
              this.storage.get('session.userId').then(userid => {
                this.storage.get('session.accessToken').then(access_Token => {
                  this.storage.get('session.userPass').then(userPassw => {
                    if(data.currentUserPass == userPassw){
                      if(data.newUserPass == data.newUserPassConfirm){
                        this.passwordTest = data.newUserPass;
                        if(this.passwordTest.length<8){
                          let alert = this.alertCtrl.create({
                            title: 'Password too short',
                            subTitle: 'New password must be 8 characters long',
                            buttons: ['Dismiss']
                          });
                          alert.present();
                        }
                        else{
                          var headers = {
                            user_id : userid.toString(),
                            access_token: access_Token }
                            this.joynalApi.userChangingPassword(headers,userPassw,data.newUserPass).subscribe(response => {
                              let alert = this.alertCtrl.create({
                                title: 'Password changed',
                                subTitle: 'Password changed successfully, you can now use Joynal with your new password',
                                buttons: ['Okay']
                              });
                              this.ionViewCanEnter();
                              alert.present();
                          })
                        }
                      }
                      else{
                        let alert = this.alertCtrl.create({
                          title: 'Wrong Password',
                          subTitle: 'Passwords mismatch',
                          buttons: ['Dismiss']
                        });
                        alert.present();
                      }
                    }
                    else{
                      let alert = this.alertCtrl.create({
                        title: 'Wrong Password',
                        subTitle: 'Your current password is wrong',
                        buttons: ['Dismiss']
                      });
                      alert.present();
                    }
                  })
                })
              })
            })
    
          }
        }
      ]

    }).present();
  }
  // IsNotify
  entryVisibilityToggleChange(){
    if(this.entryVisibilityToggle.toString()=="true"){
      this.toast.show(`Sharing entry as anonymous user has been turned on`, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
    else{
      this.toast.show(`Sharing entry as anonymous user has been turned off`, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
    this.storage.ready().then(() => {
      this.storage.get('session.userId').then(userid => {
        this.storage.get('session.accessToken').then(accessToken => {
            this.storage.get('session.isNotificationAllowed').then(isNotificationAllowed => {
              var headers = {user_id : userid.toString(),access_token: accessToken }
              console.log(this.entryVisibilityToggle);
              this.joynalApi.updateUserSettings(headers,userid,this.reminderTime,this.entryVisibilityToggle.toString(),isNotificationAllowed).subscribe(resp => {
               this.storage.set('session.isEntryVisible',this.entryVisibilityToggle.toString())
              })
            })
        
        }) 
      })
    })
  }
  changeDate(){
    this.storage.ready().then(() => {
      this.storage.get('session.userId').then(userid => {
        this.storage.get('session.accessToken').then(accessToken => {
          this.storage.get('session.isEntryVisible').then(isEntryVisible => {
            this.storage.get('session.isNotificationAllowed').then(isNotificationAllowed => {
              var headers = {user_id : userid.toString(),access_token: accessToken }
              this.joynalApi.updateUserSettings(headers,userid,this.reminderTime,isEntryVisible,isNotificationAllowed).subscribe(resp => {
               this.storage.set('session.reminderTime',this.reminderTime);
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
            this.userName = resp.data.userName;
            this.reminderTime = resp.data.reminderTime;
            this.entryVisibilityToggle = resp.data.isEntryVisible;
          })
        })
      })
    })
  }
  goBack(){
    this.navCtrl.setRoot("HomeScreenPage");
  }
}
