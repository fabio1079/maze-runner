///<reference path="./position.ts" />
///<reference path="./node.ts" />
///<reference path="./linked-list.ts" />

class Stack extends LinkedList {

  constructor() {
    super();
  }

  
  pop(): Position {
    if (!this.hasData()) { 
      return null; 
    }
    
    let node = this.tail
    let data = node.data;
    
    this.tail = node.prev;

    node = null;
    this.length--;

    return data;
  }


  getLastAdded(): Position {
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
