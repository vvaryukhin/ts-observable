import { queue } from "./observe";
import { AnyFunction, AnyObject } from "types";
import { isFunction } from "utils";

type Target = AnyObject;
type Subscriber = AnyFunction;

const subscribers = new WeakMap();

export const subscribe = (target: Target, key: string) => {
  addSubscriber(target, key, queue.last);
};

export const unsubscriber = (
  target: Target,
  key: string,
  subscriber: Subscriber
) => {
  removeSubscriber(target, key, subscriber);
};

export const dispatch = (target: Target, key: string) => {
  const subscribers = getSubscribers(target, key);

  subscribers.forEach((s: any) => {
    if (isFunction(s)) {
      s();
    }
  });
};

function getTarget(target: Target) {
  if (!subscribers.has(target)) {
    subscribers.set(target, new Map());
  }

  return subscribers.get(target);
}

function getKey(target: Target, key: string) {
  const _target = getTarget(target);

  if (!_target.has(key)) {
    _target.set(key, new Set());
  }

  return _target.get(key);
}

function getSubscribers(target: Target, key: string) {
  return getKey(target, key);
}

export function addSubscriber(
  target: Target,
  key: string,
  subscriber: Subscriber
) {
  if (!subscriber) return;
  const _subscribers = getSubscribers(target, key);
  _subscribers.add(subscriber);
}

export function removeSubscriber(
  target: Target,
  key: string,
  subscriber: Subscriber
) {
  const _subscribers = getSubscribers(target, key);
  _subscribers.delete(subscriber);
}
