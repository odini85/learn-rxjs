import { from } from "rxjs";
const observable$ = from([1, 2, 3, 4, 5]);

const observer = {
  next: (...args) => {
    console.log("next : ", ...args);
  },
  error: (err) => {
    console.error("error : ", err);
  },
  complete: () => {
    console.log("completed : ");
  },
};

observable$.subscribe(observer);
