import { fromEvent } from 'rxjs';
import { filter , map } from 'rxjs/operators';

const isWASDKey = (event: KeyboardEvent)=>{
    const key = event.key.toLowerCase();
    return ['w', 'a', 's', 'd'].includes(key);
};

const isArrowKey = (event:KeyboardEvent) => {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
};



const wasdKeyObservable = fromEvent(document, 'keydown').pipe(
    filter((event: KeyboardEvent ) => isWASDKey(event)),
    map(event => event.key.toLowerCase())
  );

const arrowKeyObservable = fromEvent(document, 'keydown').pipe(
    filter((event: KeyboardEvent ) => isArrowKey(event)),
    map(event => event.key)
  );

wasdKeyObservable.subscribe(wasdKey => {
    console.log(`WASD key pressed: ${wasdKey}`);
  });

arrowKeyObservable.subscribe(arrowKey => {
      console.log(`Arrow key pressed: ${arrowKey}`);
    });
const main = () => {
    console.log("holi");
};
main();
