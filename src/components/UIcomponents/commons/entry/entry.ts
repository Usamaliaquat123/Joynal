import { Component } from '@angular/core';

/**
 * Generated class for the EntryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'entry',
  templateUrl: 'entry.html'
})
export class EntryComponent {

  text: string;

  constructor() {
    console.log('Hello EntryComponent Component');
    this.text = 'Hello World';
  }

}
