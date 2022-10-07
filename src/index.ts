import { Observable } from "./Observable";


const timerObservable = new Observable((observer) => {
  const subscriptionId = Math.random();
  let count = 0;
  const ref = setInterval(() => {
    // adding here would be a problem
    observer.next(`SUB - ${subscriptionId} =>  ${count}`);
    count++;
    if (count > 3) {
      observer.error("error!!!");
    }
  }, 1000);

  return () => {
    clearInterval(ref);
  }
});

const firstTimerSubscription = timerObservable.subscribe({
  next: (value) => {
    console.log('value', value);
  },
  error: (err) => {
    console.log('error', err);
  },
  complete: () => {
    console.log('complete');
  },
});

setTimeout(firstTimerSubscription.unsubscribe, 5000);

// const secondTimerSubscription = timerObservable.subscribe({
//   next: (value) => {
//     console.log('value', value);
//   },
//   error: (err) => {
//     console.log('error', err);
//   },
//   complete: () => {
//     console.log('complete');
//   },
// });



// setTimeout(secondTimerSubscription.unsubscribe, 10000);

// 0,1,2,3,4,5,6,7,8,9,10, complete !!!!
// 0,1,2,3,4,5,6,7,8,9,10, complete, 11, complete, 12, complete, 13, complete
