import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import firebase from "firebase";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers : [JoynalApiProvider]
})
export class SignupPage {
  // Importiong social inputs
  authfb : any;
  authtweet : any;
  authInsta : any;
    // authfoem intgration
    authForm : FormGroup;

    isItCheck : false;
    // FormPassword Checker
    passwordType : String =  'password';
    passwordShown : boolean = false;
 
  constructor(public apiJoynal : JoynalApiProvider,public formBuilder : FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
  ;
    this.authForm = formBuilder.group({
      'name' : [null, Validators.compose([Validators.required])],
      'email' : [null, Validators.compose([ Validators.required,Validators.minLength(3), Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')
     ])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8) ])]
    })
  }

  checkUserExists(email) {

  }



  goBack(){
    this.navCtrl.pop();
  }
  user(email){
    console.log('trigger');
    this.apiJoynal.checkingUserIfExists(email).subscribe(data => {
      
    });

  }
  togglePassword(){
    console.log('clicked');
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  userEmailChecking : any;
 


 async signUp(value){
   try{
    await this.apiJoynal.authenticationSignup(value.name,value.email,value.password).subscribe(data => {
      this.navCtrl.push('LoginPage');
    },err => console.log(err));
   }catch{
     console.log('Please check your connection and try again');
   }
    

  }
}
