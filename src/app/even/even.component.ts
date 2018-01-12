import { Component, Input } from '@angular/core';

@Component({
  'selector': 'app-even',
  'templateUrl': './even.component.html',
  'styleUrls': ['./even.component.css']
})
export class EvenComponent {
  @Input()
  number = 0;

  setNumber(nbr: number) {
    this.number = nbr;
  }

}
