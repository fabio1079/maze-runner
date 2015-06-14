///<reference path="./position.ts" />
///<reference path="./node.ts" />

class LinkedList {
  protected head: Node;
  protected tail: Node;
  protected length: number;

 
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  
  add(data: Position) {
    let node = new Node(data);

    if( this.length === 0 ) {
      this.head = node;
      this.tail = this.head;
    } else {
      node.prev = this.tail;
      this.tail.next = node;

      this.tail = this.tail.next;
    }

    return this.length++;
  }


  getLength(): number {
    return this.length;
  }


  hasData(): boolean {
    return this.length !== 0;
  }
}