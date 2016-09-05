/*jslint browser: true*/
/*global console*/

'use strict';
var isTraceEnabled = true;

function getLogger() {
    var self = Object.create(null);

    self.trace = function (msg) {
        if (isTraceEnabled) {
            console.log(msg);
        }
    };
    return self;
}

var logger = getLogger();

function Point(x, y) {
    var self = Object.create(null);
    self.x = x;
    self.y = y;
    self.equals = function (anotherPoint) {
        return (self.x === anotherPoint.x && self.y === anotherPoint.y);
    };
    return self;
}

function isValidPosition(point, map) {
    var x = point.x;
    var y = point.y;
    //logger.trace('    checking isValidPosition: [' + x + ',' + y + ']');
    return (x >= 0 && x < Object.keys(map).length && y >= 0 && y < map[0].length);
}

function isVisited(point, visited) {
    //logger.trace('    checking isVisited: [' + point.x + ',' + point.y + ']');
    return visited[point.x][point.y] == 1;
}

function isAcessable(point, map) {
    //logger.trace('    checking isAcessable: [' + point.x + ',' + point.y + ']');
    return map[point.x][point.y] == 1;
}

function getPointsAround(point) {
    var x = point.x;
    var y = point.y;
    return [new Point(x - 1, y), new Point(x + 1, y), new Point(x, y - 1), new Point(x, y + 1)];
}

function getNextPoints(point, map, visited) {
    //logger.trace('  getNextPoints: [' + point.x + ',' + point.y + ']');
    var nexts = getPointsAround(point);
    var result = [];
    nexts.map(function (next) {
        if (isValidPosition(next, map) && isAcessable(next, map) && !isVisited(next, visited)) {
            result.push(next);
        }
    });
    return result;
}

function go(startPoint, endPoint, map, visited) {
    var queue = [];
    var current;
    var nexts;

    queue.push(startPoint);
    while (queue.length > 0) {
        current = queue.shift();
        logger.trace('processing from queue: [' + current.x + ',' + current.y + ']');
        if (current.equals(endPoint)) {
            return current;
        }
        visited[current.x][current.y] = 1;

        nexts = getNextPoints(current, map, visited);

        nexts.map(function (next) {
            queue.push(next);
        });
    }
}
