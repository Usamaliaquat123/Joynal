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
  getListofEntriesOfUser(headers,userId){
    const options = new RequestOptions({headers: headers});
  return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/entry`, options).map(res => res.json());
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
    return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/randomentry`, options).map(res => res.json());
  } 
  getUserAchievement(headers,userId){
    const options = new RequestOptions({headers: headers});
    return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/achievement`, options).map(res => res.json());
  }


}
