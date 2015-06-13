///<reference path="./position.ts" />

class Node {
  public next: Node;
  public prev: Node;
  public data: Position;
 
 
  constructor(data: Position) {
    this.next = null;
    this.prev = null;
    this.data = data;
  }
}
