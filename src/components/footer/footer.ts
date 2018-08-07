import { Component , Input} from '@angular/core';
import { TwitterConnect } from "@ionic-native/twitter-connect";
import { Facebook ,FacebookLoginResponse} from "@ionic-native/facebook";
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


  constructor(public twitter : TwitterConnect ,public fb : Facebook ) {
  }



    // Bug : todo : fixing tomorrow at developer.facebook.com implementing 28 char hash
    // Facebook Authentication
    fbAuth(){
      this.authFacebook.then((res : FacebookLoginResponse) => console.log('users data' , res));
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
