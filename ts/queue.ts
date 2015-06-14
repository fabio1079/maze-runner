///<reference path="./position.ts" />
///<reference path="./node.ts" />
///<reference path="./linked-list.ts" />

class Queue extends LinkedList {

  constructor() {
    super();
  }


  shift(): Position {
    if( !this.hasData() ) { 
      return null;
    }
    
    let node = this.head;
    let data = node.data;
    this.head = node.next;

    node = null;
    this.length--;

    return data;
  }
  
  
  getFirstAdded(): Position {
    return this.head.data;
  }


  find(data: Position): Node {
    let node = this.head;

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
