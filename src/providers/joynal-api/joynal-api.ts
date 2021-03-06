import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http,RequestOptions } from '@angular/http';
@Injectable()
export class JoynalApiProvider {
  userId: any;
  accessToken : any;
    constructor(private storage: Storage,public http: Http,private httpClient : HttpClient) {
      storage.get('Session.access_token').then((val) => {
        this.accessToken = val;
   });
   storage.get('Session.user_id').then((val) => {
       this.userId = val;
   });
  }

  authenticationLogin(userEmail , userPassword){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/login',{ userEmail : userEmail, userPassword : userPassword })
  }
  authenticationSignup(username,userEmail, userPassword){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users', { userName : username ,userEmail : userEmail , userPassword : userPassword})
  } 
  checkingUserIfExists(userEmail){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/check-user', {userEmail : userEmail})
  }
  creatingEntriesofUser(userId,headers,entries){
    const options = new RequestOptions({headers: headers});
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/entry`, { entries : entries  },options).map(res => res.json());
  }
  creatingEntriesofUser2(userId,headers,entries,date){
    const options = new RequestOptions({headers: headers});
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/entrydate`, { entries : entries, entry_date: date  },options).map(res => res.json());
  }
  getListofEntriesOfUser(headers,userId){
    const options = new RequestOptions({headers: headers});
  return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/entry`,options).map(res => res.json());
  }
  updateUserEntryVisibility(headers,userId, isEntryVisible){
    const options = new RequestOptions({headers: headers});
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/${userId}/updatesettings`,{isEntryVisible: isEntryVisible},options); 
  }
  updateUserSettings(headers,userId, reminderTime , isEntryVisible, isNotificationAllowed){
    const options = new RequestOptions({headers: headers});
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/${userId}/updatesettings`,{reminderTime : reminderTime, isEntryVisible: isEntryVisible, isNotificationAllowed: isNotificationAllowed},options); 
  }
  updateUserName(userId,userName,headers){
    const options = new RequestOptions({headers: headers});
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/${userId}`, { userName : userName }, options);
  }
  userChangingPassword(headers,userPassword, newPassword){
    const options = new RequestOptions({headers: headers});
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/change-password `, { userPassword: userPassword , newPassword : newPassword},options)
  }
  getUsersInformation(headers,userId){
    const options = new RequestOptions({headers: headers});
    return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/${userId}`, options).map(res => res.json());
  }
  getRandomUserPosts(headers , userId){
    const options = new RequestOptions({headers: headers});
    return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/randomentryofuser`, options).map(res => res.json());
  }
  getRandomUserPostsAddEntry(headers , userId){
    const options = new RequestOptions({headers: headers});
    return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/randomentry`, options).map(res => res.json());
  }  
  getUserAchievement(headers,userId){
    const options = new RequestOptions({headers: headers});
    return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/achievement`, options).map(res => res.json());
  }
  authenticationLoginSocial(userEmail,username , userPassword){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/socialmedialogin',{ userName : username ,userEmail : userEmail, userPassword : userPassword })
  }
  forgotPassword(userEmail){
    return this.http.post(' http://clients2.5stardesigners.net/joynal/api/web/v1/users/reset-password-request',{ userEmail : userEmail })
  }
  requestRegisterVerification(userEmail){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/registration-token' ,{ userEmail : userEmail });
  }
  verificationEmail(userEmail,verifyCode){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/verify-registration',{ userEmail : userEmail , verifyCode: verifyCode})
  }
  verificationEmailResetPassword(userEmail,verifyCode){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/verify-token',{ userEmail : userEmail , verifyCode: verifyCode})
  }
  resetPassworDeeplink(userEmail , newPassword){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/reset-password',{ userEmail : userEmail , newPassword: newPassword})
  }

}
