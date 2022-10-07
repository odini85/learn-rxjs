import { interval } from "rxjs";

const obs$ = interval(1000);
const subscription = obs$.subscribe((...args) => {
  console.log("next :", ...args);
});

setTimeout((_) => {
  console.log("execute unsubscribe");
  subscription.unsubscribe();
}, 3500);
