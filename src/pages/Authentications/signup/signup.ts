import { JoynalApiProvider } from './../../../providers/joynal-api/joynal-api';
import { Component, Renderer, ElementRef } from '@angular/core';
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
  // authtweet : any;
  authInsta : any;
  testTest: any;
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
    eyeiconName : string;

  constructor(private alrtCtrl : AlertController,public apiJoynal : JoynalApiProvider,public formBuilder : FormBuilder,public navCtrl: NavController, public navParams: NavParams,public element: ElementRef, public renderer: Renderer) {
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
      // this.eyeiconNameConfirm = 'ios-eye-outline';
      this.passwordTypeConfirm = 'password';
    }else{
      this.confirmPassType = true;
      // this.eyeiconNameConfirm = 'ios-eye-off-outline';
      this.passwordTypeConfirm = 'text';
    }
  }
  togglePassword(){
    console.log('clicked');
    if(this.passwordShown){
      this.passwordShown = false;
      this.eyeiconName = 'ios-eye-outline';
      this.passwordType = 'password';
    }else{
      this.passwordShown = true;
      this.eyeiconName = 'ios-eye-off-outline';
      this.passwordType = 'text';
    }
  }

  userEmailChecking : any;
 


 async signUp(value){

   try{
    if(this.authForm.valid){
      await this.apiJoynal.authenticationSignup(value.name,value.email,value.password).subscribe(() => {

        this.apiJoynal.requestRegisterVerification(value.email).subscribe(resp => {
          console.log(resp);
          this.alrtCtrl.create({
            title : 'Registered Successfully',
            message : 'A verification email has been sent to your email account. Please check your mailbox to complete the registration process',
            buttons : [
              {
                text : 'Ok!',
                handler : () => {
                  this.navCtrl.push('AuthenticationsVerifyemailPage', value.email);
                }
              }
            ]
          }).present();
        
        },err => {
          console.log(err);
          if(err.status == 400){
            this.alrtCtrl.create({
              title : 'Already Registered!',
              message : 'This email is already registered please login.',
              buttons : [
                {
                  text : 'Ok!',
                  handler : () => {
                    this.navCtrl.setRoot('LoginPage');
                  }
                
                }
              ]
            }).present();
          }
        })
        //this.navCtrl.setRoot('LoginPage');
     
      },err => {this.response = true; this.userEmailChecking="errors"});
 
      //this.presentVerificationPrompt();
  
    }
    else{this.response = true;this.userEmailChecking = "Something missing please check and try again..!";}
   }catch{this.response = true;this.userEmailChecking = "Please check your connection and try again";}
    

  }

}
