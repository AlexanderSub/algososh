import { Node } from "./Node";

interface ILinkedList<T> {
  append: (element: T) => void
  prepend: (element: T) => void
  deleteHead: () => void
  deleteTail: () => void
  addByIndex: (element: T, index: number) => void
  deleteByIndex: (index: number) => void
  getSize: () => number
  toArray: () => T[]
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialArray: T[] = []) {
    this.head = null;
    this.size = 0;

    if (initialArray.length) {
      initialArray.forEach((item) => {
          this.append(item)
      })
    }
  }


  append(element: T) {
    const node = new Node(element)
    let current
  
    if (!this.head) {
      this.head = node;
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
  
    this.size++
  }

  prepend(element: T) {
    const node = new Node(element)
    node.next = this.head
    this.head = node
    this.size++
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head?.next
      this.size--
    }
  }

  deleteTail() {
    let current
    if (!this.head?.next) {
      this.head = null
    } else {
      current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null
    }
    this.size--
  }

  addByIndex(element: T, index: number): void {
    const node = new Node(element);
    let current = this.head
      if (index === 0) {
        node.next = current
        this.head = node
      } else {
        let previousNode = null;
        let currentIndex = 0;
        while (currentIndex++ < index) {
          previousNode = current
          if (current) {
            current = current.next
          }
        }
        node.next = current
        if (previousNode) {
          previousNode.next = node
        }
      }
    this.size++;
  }

  deleteByIndex(index: number): void {
    let current = this.head
    if (index === 0) {
      if (this.head) this.head = this.head?.next
    } else {
      let previousNode = null;
      let currentIndex = 0;
      while (currentIndex++ < index) {
        previousNode = current
        if (current) {
          current = current.next
        }
      }
      if (previousNode?.next) previousNode.next = current?.next ? current.next : null
    }
    this.size--
  }

  getSize() {
    return this.size;
  }

  toArray() {
    const list: T[] = []
    let current
    if (this.head === null) {
      return list
    } else {
      current = this.head;
      while (current.next) {
        list.push(current.value)
        current = current.next;
      }

      list.push(current.value)
    }
    return list
  }
}