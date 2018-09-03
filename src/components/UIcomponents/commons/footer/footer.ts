import { NavController } from 'ionic-angular';
import { JoynalApiProvider } from './../../../../providers/joynal-api/joynal-api';

import { Component , Input , Output, EventEmitter} from '@angular/core';

import firebase from "firebase";
import { Storage } from '@ionic/storage';
import { user } from "../../../../models/users";

/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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



    // Bug : todo : fixing tomorrow at developer.facebook.com implementing 28 char hash
    // Facebook Authentication
    fbAuth(){
      const fbProvider = firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(userData => {
        console.log(userData);
        this.joynalApi.authenticationLoginSocial(userData.user.email,userData.user.displayName,userData.user.uid).subscribe(resp => {
          this.data = resp; 
          console.log(resp);        
     
            this.storage.set('session.rememberme', true);
            this.storage.set('session.accessToken',resp.data.token);
            this.storage.set('session.name',resp.data.userName);
            this.storage.set('session.email',resp.data.userEmail);   
            this.storage.set('session.userId',resp.data.userId);
            this.storage.set('session.isNotificationAllowed',resp.data.isNotificationAllowed);
            this.storage.set('session.isEntryVisible',resp.data.isEntryVisible);
            this.storage.set('session.reminderTime',resp.data.reminderTime);
            this.navCtrl.setRoot('HomeScreenPage');
          

       
      
        })  
      
      })
    }
    // todo : Requesting for twiter developer account the application is under reviewing
    // Twitter Authentication
    twiterAuth(){
     
    }
    // todo : Implementing instagram authentication tomorrow
    // Instagram Authentication
    instaAuth(){
      console.log(this.authInstagram);
    }

}
