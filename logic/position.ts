class Position {
  public x: number;
  public y: number;
  public father: Position;
 
 
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.father = null;
  }
}
