import { subscribe, dispatch } from "./dispatcher";
import { AnyObject } from "./types";

export function observable<T extends AnyObject>(a: T): T {
  const handler: ProxyHandler<T> = {
    get<T extends AnyObject, K extends keyof T, V extends T[K]>(
      target: T,
      key: K
    ): V {
      subscribe(target, key as string);
      return target[key];
    },

    set<T extends object, K extends keyof T, V extends T[K]>(
      target: T,
      key: K,
      value: V
    ) {
      target[key] = value;
      dispatch(target, key as string);
      return true;
    }
  };

  return new Proxy<T>(a, handler);
}
