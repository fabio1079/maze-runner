///<reference path="./grid-position.ts" />
///<reference path="./node-position.ts" />
var LinkedList = (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    LinkedList.prototype.add = function (data) {
        var nodePosition = new NodePosition(data);
        if (this.length === 0) {
            this.head = nodePosition;
            this.tail = this.head;
        }
        else {
            nodePosition.prev = this.tail;
            this.tail.next = nodePosition;
            this.tail = this.tail.next;
        }
        return this.length++;
    };
    LinkedList.prototype.getLength = function () {
        return this.length;
    };
    LinkedList.prototype.hasData = function () {
        return this.length !== 0;
    };
    return LinkedList;
})();
