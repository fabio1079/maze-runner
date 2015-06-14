///<reference path="./grid-position.ts" />
///<reference path="./node-position.ts" />>
///<reference path="./grid.ts" />
///<reference path="./stack.ts" />
///<reference path="./queue.ts" />
///<reference path="./breadth-first-search.ts" />
///<reference path="./depth-first-search.ts" />


class Main {
  private grid: Grid;
  private canvas: HTMLCanvasElement;
  private startPositionButton: HTMLButtonElement;
  private endPositionButton: HTMLButtonElement;
  private startSearchButton: HTMLButtonElement;
  private btnHelp: Element;
  private helpBlockClose: Element;


  constructor() {
    this.canvas = <HTMLCanvasElement> document.querySelector("#stage canvas");

    this.startPositionButton = <HTMLButtonElement> document.querySelector("#set-start-position");
    this.endPositionButton = <HTMLButtonElement> document.querySelector("#set-end-position");
    this.startSearchButton = <HTMLButtonElement> document.querySelector("#start-search");
    this.btnHelp = document.querySelector("#btn-help");
    this.helpBlockClose = document.querySelector("#help-block-close span");

    this.grid = new Grid(this.canvas);
    this.grid.draw();

    this.startPositionButton.addEventListener('click', (mouseEvent: MouseEvent) => {
      this.setStartPosition(this.startPositionButton);
    });

    this.endPositionButton.addEventListener('click', (mouseEvent: MouseEvent) => {
      this.setEndPosition(this.endPositionButton);
    });

    this.startSearchButton.addEventListener('click', (mouseEvent: MouseEvent) => {
      this.startSearchAction(this.startSearchButton);
    });

    this.btnHelp.addEventListener('click', (mouseEvent: MouseEvent) => {
      this.showHelpBoxAction();
    });

    this.helpBlockClose.addEventListener('click', (mouseEvent: MouseEvent) => {
      this.hideHelpBoxAction();
    });

    this.canvas.addEventListener('click', (mouseEvent: MouseEvent) => {
      this.canvasClickMarker(mouseEvent, this.canvas);
    });

    this.startPositionButton.disabled = false;
  }


  getRealMouseCoords(mouseEvent: MouseEvent, canvas: HTMLCanvasElement): any {
    let totalOffsetX: number = 0;
    let totalOffsetY: number = 0;
    let canvasX: number = 0;
    let canvasY: number = 0;
    let currentElement: HTMLCanvasElement = canvas;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    } while(currentElement = <HTMLCanvasElement> currentElement.offsetParent);

    canvasX = mouseEvent.pageX - totalOffsetX;
    canvasY = mouseEvent.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY};
  }


  private initSearch(selectedRadio: HTMLInputElement) {
    if( selectedRadio.value === "dfs" ) {
      let dephFirstSearch: DephFirstSearch = new DephFirstSearch(this.grid);
    } else if( selectedRadio.value == "bfs" ) {
      let breadthFirstSearch: BreadthFirstSearch = new BreadthFirstSearch(this.grid);
    }
  }


  private canvasClickMarker(mouseEvent: MouseEvent, canvas: HTMLCanvasElement) {
    let positions: any = this.getRealMouseCoords(mouseEvent, canvas);
    let position: GridPosition = new GridPosition(Math.floor(positions.x/10), Math.floor(positions.y/10));

    if (!this.startPositionButton.disabled) {
      this.grid.setStartPosition(position);
      this.grid.draw();
    } else if (!this.endPositionButton.disabled) {
      this.grid.setEndPosition(position);
      this.grid.draw();
    }
  }


  private setStartPosition(buttonStartPosition: HTMLButtonElement) {
    buttonStartPosition.disabled = true;
    this.endPositionButton.disabled = false;
  }


  private setEndPosition(buttonEndPosition: HTMLButtonElement) {
    buttonEndPosition.disabled = true;
    this.startSearchButton.disabled = false;
  }


  private startSearchAction(searchStartButton: HTMLButtonElement) {
    searchStartButton.disabled = true;

    let radioButtons: NodeList = document.querySelectorAll("input[type='radio']");
    let selectedRadio: HTMLInputElement = null;

    for(let i = 0, len = radioButtons.length; i < len; i++) {
      let radioButton: HTMLInputElement = <HTMLInputElement> radioButtons[i];

      if( radioButton.checked ) {
        selectedRadio = radioButton;
      }
    }

    if( selectedRadio !== null ) {
      this.initSearch(selectedRadio);
    }
  }


  private showContentBlocker() {
    let contentBlocker: HTMLDivElement = <HTMLDivElement> document.querySelector("#content-blocker");

    contentBlocker.style.width = ""+document.body.clientWidth+"px";
    contentBlocker.style.height = ""+document.body.clientHeight+"px";
    contentBlocker.style.display = "block";
  }


  private hideContentBlocker() {
    let contentBlocker: HTMLDivElement = <HTMLDivElement> document.querySelector("#content-blocker");

    contentBlocker.style.width = "0px";
    contentBlocker.style.height = "0px";
    contentBlocker.style.display = "none";
  }


  private showHelpBoxAction() {
    this.showContentBlocker();

    let helpBlock: HTMLDivElement = <HTMLDivElement> document.querySelector("#help-block");

    helpBlock.style.display = "block";

    return false;
  }


  private hideHelpBoxAction() {
    this.hideContentBlocker();

    let helpBlock: HTMLDivElement = <HTMLDivElement> document.querySelector("#help-block");

    helpBlock.style.display = "none";

    return false;
  }
}


window.addEventListener('load', () => {
  let main: Main = new Main();
});
