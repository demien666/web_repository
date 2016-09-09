/*global beforeEach, describe, assert, it, trace, Point, pointToStringExec, lazyTalker, zeroContextWrapper, add1, add2, addDecorated, arr*/
describe("Main test", function () {
    "use strict";

    describe("Add new method", function () {
        it("should be function description as a result when calling added method [trace.description()]", function () {
            assert.equal(trace.description(), "this functon is printing messages to console");
        });

        it("should be working static function Point.equals(p1, p2) for POINT object comparision", function () {
            var p1 = new Point(1, 2);
            var p2 = new Point(1, 2);
            assert.equal(Point.equals(p1, p2), true);
        });

        it("should be working static function Point.clone(anotherPoint) for POINT cloning", function () {
            var p1 = new Point(1, 2);
            var p2 = Point.clone(p1);
            assert.equal(p2.x, 1);
            assert.equal(p2.y, 2);
        });

    });

    describe("Explicit set of THIS(context) by executing CALL method", function () {
        it("should be formatted output of POINT with MESSAGE by executing pointToString.call(point,message)", function () {
            var p = new Point(1, 2);
            assert.equal(pointToStringExec(p, "point"), "point:[1,2]");
        });
    });

    describe("Method borrowing", function () {
        it("Method LazyTalker.greet has to be BORROWED from Talker.sayHi", function () {
            assert.equal(lazyTalker.greet(), "Hi!");
        });
    });

    describe("Context and param bindings", function () {
        it("should be zero message with binding of object [0,0] as a context", function () {
            assert.equal(zeroContextWrapper("zero"), "zero:[0,0]");
        });
        it("should be working functions add1 and add2 when we bind first parameter of add(x,y) function to 1 and 2", function () {
            assert.equal(add1(9), 10);
            assert.equal(add2(8), 10);
        });
    });

    describe("Decorated", function () {
        it("should be execution of decorated function with timing added to arrar ARR", function () {
            var result = addDecorated(1, 2);
            assert.equal(result, 3);
            assert.equal(arr.length, 1);
        });
    });

});

