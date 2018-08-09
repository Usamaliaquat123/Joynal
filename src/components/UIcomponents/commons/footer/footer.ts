import { Component , Input , Output, EventEmitter} from '@angular/core';
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { Facebook ,FacebookLoginResponse} from "@ionic-native/facebook";
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
  // inputs : ['authFacebook','authTwitter','authInstagram']
})
export class FooterComponent {
  // Getting inputs from pages
 @Input() authFacebook : any;
 @Input() authTwitter : any;
 @Input() authInstagram : any;
 
 user = {} as user;
  constructor(public storage : Storage ,public twitter : TwitterConnect ,public fb : Facebook ) {
  }



    // Bug : todo : fixing tomorrow at developer.facebook.com implementing 28 char hash
    // Facebook Authentication
    fbAuth(){
      const fbProvider = firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(userData => {
        console.log(userData);
          // Saving data in local
          this.user.fbUid = userData.user.uid;
          this.user.name = userData.user.displayName;
          this.user.email = userData.user.email;
          
          // console.log(userData.user.email);
          // console.log(userData.user.displayName);
          // console.log(userData.user.uid);
        this.storage.set('userName', this.user.name);
        this.storage.set('userEmail', this.user.email);
        this.storage.set('FBuserId', this.user.fbUid);
      })
    }
    // todo : Requesting for twiter developer account the application is under reviewing
    // Twitter Authentication
    twiterAuth(){
      this.twitter.login();
    }
    // todo : Implementing instagram authentication tomorrow
    // Instagram Authentication
    instaAuth(){
      console.log(this.authInstagram);
    }

}
