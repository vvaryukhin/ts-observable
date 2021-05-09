export class Queue<T> {
  queue: T[] = [];

  get size(): number {
    return this.queue.length;
  }

  push(item: T): void {
    this.queue.push(item);
  }

  pop(): void {
    this.queue.pop();
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  get last(): T {
    return this.queue[this.size - 1];
  }

  get first(): T {
    return this.queue[0];
  }
}
