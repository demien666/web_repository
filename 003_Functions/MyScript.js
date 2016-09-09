/*jslint browser: true*/
/*global console*/

'use strict';

function trace(message) {
    console.log(message);
}

trace.description = function () {
    return "this functon is printing messages to console";
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.equals = function (p1, p2) {
    return (p1.x == p2.x && p2.y == p2.y);
}

Point.clone = function (anotherPoint) {
    return new Point(anotherPoint.x, anotherPoint.y);
}

function pointToString(message) {
    return message + ":[" + this.x + "," + this.y + "]";
}

function pointToStringExec(point, message) {
    return pointToString.call(point, message);
}

function Talker() {
    this.sayHi = function () {
        return "Hi!";
    }
}
var talker = new Talker();

function LazyTalker() { }
var lazyTalker = new LazyTalker();
lazyTalker.greet = talker.sayHi;

function ExtendedPoint(x, y) {
    this.x = x;
    this.y = y;
    this.toString = function (message) {
        return message + ":[" + this.x + "," + this.y + "]";
    };
}

function createPointToStringContextWrapper(p) {
    var point = new ExtendedPoint();
    return point.toString.bind(p);
}

var zeroContextWrapper = createPointToStringContextWrapper(new ExtendedPoint(0, 0));

function add(x, y) {
    return x + y;
}

var add1 = add.bind(null, 1);
var add2 = add.bind(null, 2);


function timerDecorator(func, timerArr) {
    return function() {
        var start = performance.now();
        var result = func.apply(this, arguments);
        var execTime = performance.now() - start;
        timerArr.push(execTime);
        return result;
    }
}

var arr=[];
var addDecorated = timerDecorator(add, arr);




