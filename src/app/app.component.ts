import { Component } from '@angular/core';
import {EvenComponent} from './even/even.component';
import {OddComponent} from './odd/odd.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 5 Exercise 4 - Event Emitter';

  disableBtn = true;

  evens: EvenComponent[];

  odds: OddComponent[];


  freshEvenOddsComponents($event) {
    this.evens = $event.evens;
    this.odds = $event.odds;
  }
}
