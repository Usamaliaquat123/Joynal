# Joynal


## iOS Notes
run `pod repo update`
We are using [capacitor](https://capacitor.ionicframework.com) so first you need `npx cap copy` in your directory and then `npx cap open ios`. Before you run your app you will need to follow these steps


Apple requires privacy descriptions to be specified in `Info.plist` for location information:

Name:  `Privacy - Location Always Usage Description`  Key:  `NSLocationAlwaysUsageDescription`

Name:  `Privacy - Location When In Use Usage Description`  Key:  `NSLocationWhenInUseUsageDescription`

Read about  [Setting iOS Permissions](https://capacitor.ionicframework.com/docs/ios/configuration/)  in the  [iOS Guide](https://capacitor.ionicframework.com/docs/ios/)  for more information on setting iOS permissions in Xcode
