///<reference path="./grid-position.ts" />
///<reference path="./node-position.ts" />
///<reference path="./linked-list.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Queue = (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        _super.call(this);
    }
    Queue.prototype.shift = function () {
        if (!this.hasData()) {
            return null;
        }
        var node = this.head;
        var data = node.data;
        this.head = node.next;
        node = null;
        this.length--;
        return data;
    };
    Queue.prototype.getFirstAdded = function () {
        return this.head.data;
    };
    Queue.prototype.find = function (data) {
        var node = this.head;
        while (node !== null) {
            if (node.data === data) {
                break;
            }
            else {
                node = node.next;
            }
        }
        return node;
    };
    Queue.prototype.clear = function () {
        while (this.hasData()) {
            this.shift();
        }
        ;
    };
    return Queue;
})(LinkedList);
