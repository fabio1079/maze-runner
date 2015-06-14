///<reference path="./grid-position.ts" />
///<reference path="./node-position.ts" />
///<reference path="./linked-list.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Stack = (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        _super.call(this);
    }
    Stack.prototype.pop = function () {
        if (!this.hasData()) {
            return null;
        }
        var node = this.tail;
        var data = node.data;
        this.tail = node.prev;
        node = null;
        this.length--;
        return data;
    };
    Stack.prototype.getLastAdded = function () {
        if (this.hasData()) {
            return this.tail.data;
        }
        else {
            return null;
        }
    };
    Stack.prototype.clear = function () {
        while (this.hasData()) {
            this.pop();
        }
    };
    return Stack;
})(LinkedList);
