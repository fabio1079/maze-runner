///<reference path="./grid-position.ts" />
///<reference path="./node-position.ts" />
///<reference path="./linked-list.ts" />

class Queue extends LinkedList {

  constructor() {
    super();
  }


  shift(): GridPosition {
    if (!this.hasData() ) {
      return null;
    }
    
    let node = this.head;
    let data = node.data;
    this.head = node.next;

    node = null;
    this.length--;

    return data;
  }


  getFirstAdded(): GridPosition {
    return this.head.data;
  }


  find(data: GridPosition): NodePosition {
    let node: NodePosition = this.head;

    while( node !== null ) {
      if( node.data === data ) {
        break;
      } else {
        node = node.next;
      }
    }

    return node;
  }


  clear() {
    while( this.hasData() ) {
      this.shift();
    };
  }
}
