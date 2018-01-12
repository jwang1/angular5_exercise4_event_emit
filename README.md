# Exercise4EmitEvent

Doc submitted online:

1. app.component  (has 3  children-components  -  game-control.component,  even.component,  odd.component)

    1.1)  template

   

<button class="btn-success" [disabled]="disableBtn">check bootstrap</button>

<hr>

<app-game-control (evenOdds)="freshEvenOddsComponents($event)"></app-game-control>

<hr>

<hr>

<app-even *ngFor="let e of evens"></app-even>

<hr>
<hr>

<app-odd *ngFor="let o of odds"></app-odd>

<hr>
      1.2) TypeScript

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


2.  game-control.component  (2 buttons - start timer and stop timer;  timer controls the count increment)

2.1)  Template

<button class="btn-primary" (click)="startGame()">Start</button>

<button class="btn-danger" (click)="endGame()">End</button>




2.2) TypeScript  [ heavy-lifting ] 

*)  it has 2 click-event-handlers  :   start timer,  and stop timer
*)  also has the list of EvenComponent, and a list of OddComponent
*)  when start timer button clicked;   it sets a timer to increment the counter by 1 every 1 second
    and it also Emits an Event @Output('evenOdds')  used in app.component with event-emit  on game-control.component  (Note, the event-emit is NOT a DOM event, has to be used on Angular component)
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






3. even.component (simple template and css code, but no TypeScript changes)

3.1)  Template

<div class="even"><b>Even</b> Number</div>


3.2)  styling 

.even {
  color: blue;
  background-color: yellow;
}




4. odd component (similar to even.component)

4.1) Template 

<div class="odd"><b>Odd</b> Number</div>


4.2) Styling

.odd {
  color: red;
  background-color: aliceblue;
}


