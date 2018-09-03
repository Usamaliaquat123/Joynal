import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";



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
    emailIfExists : any;
    // authfoem intgration
    authForm : FormGroup;
    data : any;
    isItCheck : false;
    response: any;
    errorDetails :any;
    // FormPassword Checker
    passwordType : String =  'password';
    passwordShown : boolean = false;
    confirmPassType : boolean  = false;
    passwordTypeConfirm : String = 'password';
  constructor(private alrtCtrl : AlertController,public apiJoynal : JoynalApiProvider,public formBuilder : FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.response = false;
    this.authForm = formBuilder.group({
      'name' : [null, Validators.compose([null, Validators.compose([Validators.required,Validators.pattern('[A-Za-z ]+$')])])],
      'email' : [null, Validators.compose([null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])
     ])],
      'password':  [null, Validators.compose([Validators.required, Validators.minLength(8) ])],
      'confirmPass': [null, Validators.compose([Validators.required, Validators.minLength(8) ])] 
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
  togglePasswordConfirm(){
    if(this.confirmPassType){
      this.confirmPassType = false;
      this.passwordTypeConfirm = 'password';
    }else{
      this.confirmPassType = true;
      this.passwordTypeConfirm = 'text';
    }
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
    if(this.authForm.valid){
      await this.apiJoynal.authenticationSignup(value.name,value.email,value.password).subscribe(() => {
        this.navCtrl.setRoot('LoginPage');
        this.alrtCtrl.create({
          title : 'Registered Successfully',
          message : 'A verification link has sent to your email, please check your email and verify your email for complete the registration process',
          buttons : [
            {
              text : 'Ok!'
            }
          ]
        }).present();
      },err => {this.response = true; this.userEmailChecking="errors"});
    }
    else{this.response = true;this.userEmailChecking = "Something missing please check and try again..!";}
   }catch{this.response = true;this.userEmailChecking = "Please check your connection and try again";}
    

  }
}
