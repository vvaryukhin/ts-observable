export type AnyFunction = (...args: any[]) => any;
export type AnyObject = { [key: string]: any };
export type Subscriber = AnyFunction;
export type Observable<T> = T;
