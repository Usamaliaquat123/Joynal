
import { JoynalApiProvider } from '../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import  firebase from "firebase";
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [JoynalApiProvider]
})
export class LoginPage {
  // Inputs of footer components
  authfb : any;
  authtweet : any;
  authInsta : any;

  // authfoem intgration
  authForm : FormGroup;
  data : any;
  isChecked : boolean;
  passwordType : string = 'password'
  passwordShown : boolean = false;
  response : boolean;
  responseText : any;
  constructor(public storage: Storage,public joynalApi : JoynalApiProvider,public formBuilder : FormBuilder,public navCtrl: NavController, public navParams: NavParams, private toast: Toast) {
   
      this.response = false;
      // Implementing form validations
      this.authForm = formBuilder.group({
        'email' : [null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])],
        'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
      })

  }

  togglePassword(){
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }
   toogleRememberMe(){
     if(this.isChecked == true){
      this.isChecked = false;
    }else{
       this.isChecked = true;
      
    }
  }
  async login(value){
    console.log('trigger login');
    try{
      if(this.authForm.valid){
          await this.joynalApi.authenticationLogin(value.email,value.password).subscribe(data => {

            // console.log(data.json());
            if(this.isChecked == true){
              this.data = data.json();
              console.log(this.data);
              this.storage.set('session.accessToken',this.data.data.token);
              this.storage.set('session.name',this.data.data.userName);
              this.storage.set('session.email',this.data.data.userEmail);
              this.storage.set('session.userPass', value.password);
              this.storage.set('session.userId',this.data.data.userId);
              this.storage.set('session.isNotificationAllowed',this.data.data.isNotificationAllowed);
              this.storage.set('session.isEntryVisible',this.data.data.isEntryVisible);
              this.storage.set('session.reminderTime',this.data.data.reminderTime);
              console.log('Saving to local');
        

             this.navCtrl.setRoot('HomeScreenPage');
             
          }else{
            this.storage.set('session.userId',this.data.data.userId);
            this.storage.set('session.accessToken',this.data.data.token);
            this.navCtrl.setRoot('HomeScreenPage');
          }
            // console.log(data);
            // console.log(data.json());
          // this.navCtrl.push('HomeScreenPage');
        },err => {
          // console.log(err.json());
          if(err.json().error.status  = '400'){
            this.response = true;
            this.toast.show(`This email address is not found. please register and try again`, '3000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              }
            );
           //this.responseText = "This email address is not found. please register and try again";
          }
        });  
      }else{
        //this.responseText = "Please check credentials and try again"
        this.response = true;
        this.toast.show(`Please check credentials and try again`, '3000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );

      }
      
    }catch{
      console.log('not connected to the internet!!');
      this.toast.show(`Please check your internet connection and try again`, '3000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
    
  }

  ionViewCanEnter(){
    
  
    firebase.auth().onAuthStateChanged(socialUser => {
      if(socialUser) {
        this.navCtrl.setRoot('HomeScreenPage');
      } else {
        this.storage.ready().then(() => {
          this.storage.get('session.accessToken').then(data => {
            if(data !==  '' && data !== null){
              this.navCtrl.setRoot('HomeScreenPage');
            }
          })
        })
      }
    });
  }


  signUp(){
    this.navCtrl.push('SignupPage');
  }
  forgotPage(){
    this.navCtrl.push("ForgotPasswordPage");
  }
}
