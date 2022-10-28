import { Node } from "./Node";

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void
  deleteHead: () => void
  deleteTail: () => void
  addByIndex: (element: T, index: number) => void
  deleteByIndex: (index: number) => void
  getSize: () => number;
  // toArray: () => T[]
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor(head: number[] | null) {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(element: T) {
    const node = new Node(element);
  
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
  
      return this;
    }
  
    this.tail.next = node;
  
    this.tail = node;
  
    return this;
  }



  prepend(element: T) {
    const node = new Node(element, this.head);
  
    this.head = node;
  
    if (!this.tail) {
      this.tail = node;
    }
  
    return this;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
  
    const deletedHead = this.head;
  
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
  
    return deletedHead;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }

    const deletedTail = this.tail;
  
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
  
      return deletedTail;
    }
  
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
  
    this.tail = currentNode;
  
    return deletedTail;
  }

  addByIndex(element: T, index: number): void {
    // const node = new Node(element);
    // if (index === 0) {
    //   node.next = this.head;
    //   this.head = node;
    // } else {
    //     let cur = this.head;
    //     let curIndex = 0;
    //     while (curIndex < index - 1) {
    //       cur = cur.next;
    //       curIndex++;
    //     }
    //   node.next = cur.next;
    //   cur.next = node;
    // }
    // this.size++;
  }

deleteByIndex(index: number): void {
  // if (index === 0) {
  //     this.head = this.head.next;
  // }
  // else {
  //     let cur = this.head;
  //     let curIndex = 0;
  //     while (curIndex < index - 1) {
  //         cur = cur.next;
  //         curIndex++;
  //     }
  //     cur.next = cur.next.next;
  // }
  // this.size--;
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