import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import firebase from "firebase";
import { Storage } from "@ionic/storage";
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'home-footer',
  templateUrl: 'home-footer.html'
})
export class HomeFooterComponent {

  text: string;

  constructor(public navCtrl : NavController,public storage : Storage,private alertCtrl: AlertController) {
  
  }

  logout(){
    this.storage.set('session.currentPage','');

    let alert = this.alertCtrl.create({
      title: 'Confirm Log out',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Log out',
          handler: () => {
            // firebase.auth().onAuthStateChanged(user => {
            //   if(user){
            //     console.log(user);
            //     // destroying all sessions
            //       this.storage.remove('userName');
            //       this.storage.remove('userEmail');
            //       this.storage.remove('FBuserId');
            //     // signout from firebase
            //     //firebase.auth().signOut().then(() => {this.navCtrl.setRoot('LoginPage');});
               
            //   }else{
            //     // destroying all sessions
            //     this.storage.remove('session.accessToken');
            //     this.storage.remove('session.rememberme');
            //     this.storage.remove('session.name');
            //     this.storage.remove('session.email');
            //     this.storage.remove('session.userId');
            //     this.storage.remove('session.isNotificationAllowed');
            //     this.storage.remove('session.isEntryVisible');
            //     this.storage.remove('session.userPass');
            //     this.storage.remove('session.email');
            //     this.navCtrl.setRoot('LoginPage');
            //   }
            // })
            console.log('logout clicked');
            this.storage.remove('session.accessToken');
            this.storage.remove('session.rememberme');
            this.storage.remove('session.name');
            this.storage.remove('session.email');
            this.storage.remove('session.userId');
            this.storage.remove('session.isNotificationAllowed');
            this.storage.remove('session.isEntryVisible');
            this.storage.remove('session.userPass');
            this.storage.remove('session.email');
            this.navCtrl.setRoot('LoginPage');
          }
        }
      ]
    });
    alert.present();
  }
  redirectNotifications(){
    this.storage.get('session.currentPage').then(res=>{
      if(res == "NotificationsPage"){

      }
      else{
        this.navCtrl.push("NotificationsPage");
      }
    })
  }
  about(){
    this.storage.get('session.currentPage').then(res=>{
      if(res == "AboutPage"){

      }
      else{
        this.navCtrl.push("AboutPage");
      }
    })
  }
  redirectAchievements(){
    this.storage.get('session.currentPage').then(res=>{
      if(res == "AchievementsMainPage"){

      }
      else{
        this.navCtrl.push("AchievementsMainPage");
      }
    })
  }
  redirectSettings(){
    this.storage.get('session.currentPage').then(res=>{
      if(res == "SettingsPage"){

      }
      else{
        this.navCtrl.push("SettingsPage");
      }
    })
  }
}
