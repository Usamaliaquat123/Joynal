import { NavController } from 'ionic-angular';
import { JoynalApiProvider } from './../../../../providers/joynal-api/joynal-api';

import { Component , Input } from '@angular/core';

// import firebase from "firebase";
import { Storage } from '@ionic/storage';
import { user } from "../../../../models/users";

@Component({
  selector: 'footerlogin',
  templateUrl: 'footer.html',
  providers : [JoynalApiProvider]
})
export class FooterComponent {
  // Getting inputs from pages
 @Input() authFacebook : any;
 @Input() authTwitter : any;
 @Input() authInstagram : any;
 data : any;
 user = {} as user;
  constructor(private joynalApi : JoynalApiProvider,public storage : Storage,public navCtrl  :NavController) {
  }
    fbAuth(){
      //  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
      // .then(userData => {
      //   console.log(userData);
      //   this.joynalApi.authenticationLoginSocial(userData.user.email,userData.user.displayName,userData.user.uid).subscribe(resp => {
      //     this.data = resp; 
      //       this.storage.set('session.rememberme', true);
      //       this.storage.set('session.accessToken', this.data.data.token);
      //       this.storage.set('session.name', this.data.data.userName);
      //       this.storage.set('session.email', this.data.data.userEmail);   
      //       this.storage.set('session.userId', this.data.data.userId);
      //       this.storage.set('session.isNotificationAllowed', this.data.data.isNotificationAllowed);
      //       this.storage.set('session.isEntryVisible', this.data.data.isEntryVisible);
      //       this.storage.set('session.reminderTime', this.data.data.reminderTime);
      //       this.navCtrl.setRoot('HomeScreenPage');
      //   })  
      // })
    }

    twiterAuth(){
     
    }

    instaAuth(){
      console.log(this.authInstagram);
    }

}
