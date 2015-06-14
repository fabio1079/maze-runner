///<reference path="./grid-position.ts" />
///<reference path="./node-position.ts" />

class LinkedList {
  protected head: NodePosition;
  protected tail: NodePosition;
  protected length: number;

 
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  
  add(data: GridPosition) {
    let nodePosition = new NodePosition(data);

    if( this.length === 0 ) {
      this.head = nodePosition;
      this.tail = this.head;
    } else {
      nodePosition.prev = this.tail;
      this.tail.next = nodePosition;

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