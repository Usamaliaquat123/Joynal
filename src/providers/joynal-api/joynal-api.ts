import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
@Injectable()
export class JoynalApiProvider {

  constructor(public http: Http) {
  
  }

// Authenticating users login POST
  authenticationLogin(userEmail , userPassword){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/login',{ userEmail : userEmail, userPassword : userPassword })
  }
// Authenticating users Signup POST
  authenticationSignup(username,userEmail, userPassword){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users', { userName : username ,userEmail : userEmail , userPassword : userPassword})
  }
// Checking user if exists in real time  
  checkingUserIfExists(userEmail){
    return this.http.post('http://clients2.5stardesigners.net/joynal/api/web/v1/users/check-user', {userEmail : userEmail})
  }
  creatingEntriesofUser(userId,entries){
    return this.http.post(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/entry`, { entries : entries  })
  }
  getListofEntriesOfUser(userId){
    return this.http.get(`http://clients2.5stardesigners.net/joynal/api/web/v1/entries/user/${userId}/entry`)
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


}
