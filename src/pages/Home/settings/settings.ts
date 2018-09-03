
import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

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
  constructor(private storage : Storage,private joynalApi : JoynalApiProvider,private alertCtrl : AlertController,public navCtrl: NavController, public navParams: NavParams) {
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
                    this.storage.set('session.name',userid)
                    this.ionViewDidLoad();
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
          placeholder : '.................',
          name : 'userPass'      
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
                    var headers = {
                      user_id : userid.toString(),
                      access_token: access_Token }
                    this.joynalApi.userChangingPassword(headers,userPassw,data.userPass).subscribe(response => {
                      this.storage.set('session.userPass',userPassw);
                   })
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
    this.storage.ready().then(() => {
      this.storage.get('session.userId').then(userid => {
        this.storage.get('session.accessToken').then(accessToken => {
            this.storage.get('session.isNotificationAllowed').then(isNotificationAllowed => {
              var headers = {user_id : userid.toString(),access_token: accessToken }
              console.log(this.entryVisibilityToggle);
              this.joynalApi.updateUserSettings(headers,userid,this.reminderTime,this.entryVisibilityToggle.toString(),isNotificationAllowed).subscribe(resp => {
                this.storage.set('session.isNotificationAllowed',this.entryVisibilityToggle.toString());
                console.log(resp);
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
}
