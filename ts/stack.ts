///<reference path="./grid-position.ts" />
///<reference path="./node-position.ts" />
///<reference path="./linked-list.ts" />

class Stack extends LinkedList {

  constructor() {
    super();
  }


  pop(): GridPosition {
    if (!this.hasData()) { 
      return null; 
    }

    let node: NodePosition = this.tail
    let data: GridPosition = node.data;

    this.tail = node.prev;

    node = null;
    this.length--;

    return data;
  }


  getLastAdded(): GridPosition {
    if (this.hasData()) {
      return this.tail.data;
    } else {
      return null;
    }
  }


  clear() {
    while( this.hasData() ) {
      this.pop();
    }
  }
}
