import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import firebase from "firebase";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the HomeFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-footer',
  templateUrl: 'home-footer.html'
})
export class HomeFooterComponent {

  text: string;

  constructor(public navCtrl : NavController,public storage : Storage) {
  
  }

  logout(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log(user);
        // destroying all sessions
          this.storage.remove('userName');
          this.storage.remove('userEmail');
          this.storage.remove('FBuserId');
        // signout from firebase
        firebase.auth().signOut().then(() => {this.navCtrl.setRoot('LoginPage');});
       
      }else{
        // destroying all sessions
        this.storage.remove('session.accessToken');
        this.storage.remove('session.name');
        this.storage.remove('session.email');
        this.storage.remove('session.userId');
        this.storage.remove('session.isNotificationAllowed');
        this.storage.remove('session.isEntryVisible');
        this.navCtrl.setRoot('LoginPage');
      }
    })
  }
  redirectNotifications(){
    this.navCtrl.push("NotificationsPage");
  }
  about(){
    this.navCtrl.push("AboutPage");
  }
}
