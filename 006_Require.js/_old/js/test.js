/*global beforeEach, describe, assert, it, logger, Point, isValidPosition, getPointsAround, getNextPoints, go*/
describe("Main test", function () {
    "use strict";

    var map;
    var visited;

    beforeEach(function () {
        map = [
            [1, 0, 0, 0, 0],
            [1, 0, 1, 1, 0],
            [1, 1, 1, 1, 0],
            [1, 0, 0, 1, 0],
            [1, 0, 0, 1, 1]
        ];
        visited = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
    });

    describe("Point class", function () {
        it("should return TRUE on calling EQUALS for another point with the same coordinates", function () {
            var point = new Point(1, 2);
            var theSamePoint = new Point(1, 2);
            assert.equal(point.equals(theSamePoint), true);
        });

        it("should return FALSE on calling EQUALS for another point with the different coordinates", function () {
            var point = new Point(1, 2);
            var anotherPoint = new Point(1, 3);
            assert.equal(point.equals(anotherPoint), false);
        });

        it("should return LEVEL=0 if parent is NULL", function () {
            var point = new Point(1, 2);
            assert.equal(point.level, 0);
        });

        it("should have LEVEL=parent.LEVEL+1 if parent is NOT NULL", function () {
            var point = new Point(1, 2);
            var childPoint = new Point(2, 3, point);
            var nextChild = new Point(3, 4, childPoint);
            assert.equal(childPoint.level, 1);
            assert.equal(nextChild.level, 2);
        });

    });

    describe("isValidPosition", function () {
        it("should be TRUE for coordinates inside map", function () {
            assert.equal(isValidPosition(new Point(1, 1), map), true);
        });

        it("should be FALSE for coordinates with x<0", function () {
            assert.equal(isValidPosition(new Point(-1, 1), map), false);
        });

        it("should be FALSE for coordinates with x>=map.length", function () {
            assert.equal(isValidPosition(new Point(Object.keys(map).length, 1), map), false);
        });

        it("should be FALSE for coordinates with y<0", function () {
            assert.equal(isValidPosition(new Point(1, -1), map), false);
        });

        it("should be FALSE for coordinates with y>=map.length", function () {
            assert.equal(isValidPosition(new Point(1, map[0].length), map), false);
        });

    });

    describe("getPointsAround", function () {
        var x = 1;
        var y = 1;
        var point = new Point(x, y);
        var positions = getPointsAround(point);

        it("Should return 4 positions around point", function () {
            assert.equal(positions.length, 4);
        });

        it("Should be [x-1,y] for position #1", function () {
            assert.equal(positions[0].equals(new Point(x - 1, y)), true);
        });

        it("Should be [x+1,y] for position #2 ", function () {
            assert.equal(positions[1].equals(new Point(x + 1, y)), true);
        });

        it("Should be [x,y-1] for position #3 ", function () {
            assert.equal(positions[2].equals(new Point(x, y - 1)), true);
        });

        it("Should be [x,y+1] for position #4 ", function () {
            assert.equal(positions[3].equals(new Point(x, y + 1)), true);
        });

    });

    describe("getNextPoints", function () {
        var nexts;
        it("Should return 1 next point from position [0,0]", function () {
            nexts = getNextPoints(new Point(0, 0), map, visited);
            assert.equal(nexts.length, 1);
            assert.equal(nexts[0].equals(new Point(1, 0)), true);
        });

        it("Should return 2 next points from position [2,1]", function () {
            nexts = getNextPoints(new Point(2, 1), map, visited);
            assert.equal(nexts.length, 2);
            assert.equal(nexts[0].equals(new Point(2, 0)), true);
            assert.equal(nexts[1].equals(new Point(2, 2)), true);
        });

        it("Should return 1 next point from position [2,1] if position [2,0] was visited", function () {
            visited[2][0] = 1;
            nexts = getNextPoints(new Point(2, 1), map, visited);
            assert.equal(nexts.length, 1);
            assert.equal(nexts[0].equals(new Point(2, 2)), true);
        });
    });

    describe("go", function () {
        var startPoint = new Point(0, 0);
        var endPoint = new Point(4, 4);

        it("Should return valid path from startPoint to endPoint for valid set of parameters", function () {
            var result = go(startPoint, endPoint, map, visited);
            assert.equal(result[0].equals(endPoint), true);
            assert.equal(result[result.length - 1].equals(startPoint), true);
        });

    });

});
