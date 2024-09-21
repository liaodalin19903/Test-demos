import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const times = 8

const source$ = interval(1000).pipe(
  take(times)
);  

source$.subscribe((result) => {
  console.log(result);  // 0 1 2 3 4 5 6 7 
});
