import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

const observer = {
  next: (...args) => {
    console.log("next : ", ...args);
  },
  error: (err) => {
    console.error("error : ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

const observable$ = fromEvent(document, "click");

observable$
  .pipe(
    map((event: MouseEvent) => {
      return {
        x: event.x,
        y: event.y,
      };
    })
  )
  .subscribe(observer);
