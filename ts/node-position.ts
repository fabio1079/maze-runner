///<reference path="./grid-position.ts" />

class NodePosition {
  public next: NodePosition;
  public prev: NodePosition;
  public data: GridPosition;
 
 
  constructor(data: GridPosition) {
    this.next = null;
    this.prev = null;
    this.data = data;
  }
}
