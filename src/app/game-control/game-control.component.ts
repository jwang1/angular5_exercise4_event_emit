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

  updateCount(obj) {
    obj.cnt++;

    if (obj.cnt % 2 === 0) {
      obj.evenComps.push(new EvenComponent());
    } else {
      obj.oddComps.push(new OddComponent());
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


    let my = this;

    this.interval = setInterval(() => {
      my.updateCount(my);
    }, ONE_THOUSAND_MILLISECOND);

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
