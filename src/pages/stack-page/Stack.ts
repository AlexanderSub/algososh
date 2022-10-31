interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getSize: () => number;
  getElements: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container[this.getSize()] = item
  };

  pop = (): void => {
    if (this.container.length > 0) {
      this.container.pop()
    }
  };

  clear = (): void => {
    this.container = []
  };

  getSize = () => this.container.length

  getElements = () => this.container
}