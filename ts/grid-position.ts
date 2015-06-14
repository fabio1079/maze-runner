class GridPosition {
  public x: number;
  public y: number;
  public father: GridPosition;
 
 
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.father = null;
  }
}
