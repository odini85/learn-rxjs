import { ajax } from "rxjs/ajax";

const obs$ = ajax("https://jsonplaceholder.typicode.com/todos/1");

obs$.subscribe((result) => console.log(result.response));
