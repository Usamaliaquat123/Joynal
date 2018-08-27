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
  creatingEntriesofUser(userId,entries){
    
    return this.httpClient.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/entry`, { entries : entries  })
  }
  getListofEntriesOfUser(headers,userId){
    console.log(userId);
    console.log(headers);
    const options = new RequestOptions({headers: headers});
  return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/entry`, options).map(res => res.json());


    
  }
  updateUserSettings(userId, reminderTime , isEntryVisible, isNotificationAllowed){
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/${userId}/updatesettings`,{reminderTime : reminderTime, isEntryVisible: isEntryVisible, isNotificationAllowed: isNotificationAllowed}) 
  }
  updateUserInformation(userId,userName){
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/${userId}`, { userName : userName });
  }
  userChangingPassword(userPassword, newPassword){
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/change-password `, { userPassword: userPassword , newPassword : newPassword})
  }
  getUsersInformation(userId){
    return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/users/${userId}`)
  }
  creatingEntriesTest(userId,entries){
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/app/test-post/${userId}`, { entries : entries  })
  }

}
