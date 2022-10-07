import { fromEvent } from "rxjs";

function main() {
  const input = document.createElement("input");
  input.id = "myInput";
  document.body.append(input);

  const obs1$ = fromEvent(document, "click");
  const obs2$ = fromEvent(document.getElementById("myInput"), "keypress");

  obs1$.subscribe((item) => {
    console.log("document click! :", item);
  });
  obs2$.subscribe((item) => {
    console.log("input keypress", item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});
