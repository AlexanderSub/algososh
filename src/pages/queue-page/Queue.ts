interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: T[] | undefined[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(undefined);
  }

  enqueue = (item: T): void => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item
    this.tail++
    this.length++
  };

  dequeue = (): void => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = undefined
    this.head++
    this.length--
  };

  clear = (): void => {
    this.container = Array(this.size).fill(undefined)
    this.tail = 0
    this.head = 0
    this.length = 0
  };

  isEmpty = (): boolean => this.length === 0;

  getHead(): number {
    return this.head
  }

  getTail(): number {
    return this.tail
  }

  getLength(): number {
    return this.length
  }

  getElements(): T[] | undefined[] {
    return this.container
  }

  getSize(): number {
    return this.size
  }
}