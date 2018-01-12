import { Component, Input } from '@angular/core';

@Component({
  'selector': 'app-odd',
  'templateUrl': './odd.component.html',
  'styleUrls': ['./odd.component.css']
})
export class OddComponent {
  @Input()
  number = 0;

  setNumber(nbr: number) {
    this.number = nbr;
  }
}
