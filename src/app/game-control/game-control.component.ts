import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import {interceptingHandler} from "@angular/common/http/src/module";

// following (webstorm imported clearInterval from "timers", caused  "timeout.close is not a function" error
// https://github.com/angular/angular/issues/12400
//import {clearInterval} from "timers";

import {EvenComponent} from "../even/even.component";
import {OddComponent} from "../odd/odd.component";

const ONE_THOUSAND_MILLISECOND = 1000;

@Component({
  'selector': 'app-game-control',
  'templateUrl': './game-control.component.html',
  'styleUrls': ['./game-control.component.css']
})
export class GameControlComponent {

  @Output('evenOdds')
  evenOdds: EventEmitter<{'evens': EvenComponent[], 'odds': OddComponent[]}> = new EventEmitter<{evens: EvenComponent[], odds: OddComponent[]}>();

  evenComps: EvenComponent[] = [];

  oddComps: OddComponent[] = [];

  // interval = setInterval(this.updateCount, ONE_THOUSAND_MILLISECOND);

  interval: any;

  cnt = 0;

  updateCount() {
    this.cnt++;

    if (this.cnt % 2 === 0) {
      let cmp  = new EvenComponent();
      cmp.setNumber(this.cnt);
      this.evenComps.push(cmp);
    } else {
      let cmp = new OddComponent();
      cmp.setNumber(this.cnt);
      this.oddComps.push(cmp);
    }
  }

  getCount(): number {
    return this.cnt;
  }

  startGame() {
    // do not set up too many timers.
    if (this.interval) {
      return;
    }


    // let my = this;

    // Huh, using ES6 anonymous function does not require "this" special handling.
    this.interval = setInterval(() => {
      this.updateCount();
    }, ONE_THOUSAND_MILLISECOND);

    // Note, the author's way of emitting is different;  he emits from the setInterval anonymous-func - for the single-Count;
    // so, every 1 second, he emits the counter.    My way was updating the components every 1 second; the binding was in *ngFor
    // from Template.    Author's way (emitting single number) makes code simpler.
    // emit @Output
    this.evenOdds.emit({'evens': this.evenComps, 'odds': this.oddComps});
  }

  endGame() {
    if (this.interval) {
      try {
        clearInterval(this.interval);
      } catch (error) {
        console.log('clearInterval encountered error: ' + error);
      }

      this.interval = null;
    }
  }
}
