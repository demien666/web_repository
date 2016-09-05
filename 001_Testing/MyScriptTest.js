/*global describe, assert, it, logger, Point, getPositionsAround*/
describe("Main test", function () {
    "use strict";

    describe("Point class", function () {
        it("EQUALS function for another point with the same coordinates should return TRUE", function () {
            var point = new Point(1, 2);
            var theSamePoint = new Point(1, 2);
            assert.equal(point.equals(theSamePoint), true);
        });

        it("EQUALS function for another point with the different coordinates should return FALSE", function () {
            var point = new Point(1, 2);
            var anotherPoint = new Point(1, 3);
            assert.equal(point.equals(anotherPoint), false);
        });

    });

    describe("getNextPossiblePositions", function () {
        var x = 1;
        var y = 1;
        var point = new Point(x, y);
        var positions = getPositionsAround(point);

        it("Should return 4 positions around point", function () {
            assert.equal(positions.length, 4);
        });

        it("Position #1 should be [x-1,y]", function () {
            assert.equal(positions[0].equals(new Point(x - 1, y)), true);
        });

        it("Position #2 should be [x+1,y]", function () {
            assert.equal(positions[1].equals(new Point(x + 1, y)), true);
        });

        it("Position #3 should be [x,y-1]", function () {
            assert.equal(positions[2].equals(new Point(x, y - 1)), true);
        });

        it("Position #4 should be [x,y+1]", function () {
            assert.equal(positions[3].equals(new Point(x, y + 1)), true);
        });

    });

});
