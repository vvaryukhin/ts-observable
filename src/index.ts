import { observable } from "./observable";
import { observe } from "./observe";

console.clear();

console.log("------------------ START --------------------");

const o = observable({ a: 1, b: 2 });

document.querySelector("#button")?.addEventListener("click", () => {
  o.a += 1;
});

setInterval(() => {
  o.b += 2;
}, 1000);

observe(() => {
  console.log("OBSERVER A", o.a);
});

observe(() => {
  console.log("OBSERVER B", o.b);
});

// console.log(observer);

console.log("------------------- END ---------------------");
