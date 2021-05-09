import { AnyFunction } from "./types";
import { Queue } from "./queue";

export const queue = new Queue<AnyFunction>();

export const observe = (fn: AnyFunction, options = {}) => {
  queue.push(fn);
  fn();
  queue.pop();
  return fn;
};
