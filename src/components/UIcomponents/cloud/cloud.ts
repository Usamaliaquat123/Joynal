import { Component } from '@angular/core';

/**
 * Generated class for the CloudComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cloud',
  templateUrl: 'cloud.html'
})
export class CloudComponent {

  text: string;

  constructor() {
    console.log('Hello CloudComponent Component');
    this.text = 'Hello World';
  }

}
