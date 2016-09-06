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

function Point(x, y, parent) {
    var self = Object.create(null);
    self.x = x;
    self.y = y;
    self.parent = parent;
    self.level = 0;
    if (parent) {
        self.level = parent.level + 1;
    }
    self.equals = function (anotherPoint) {
        return (self.x === anotherPoint.x && self.y === anotherPoint.y);
    };
    self.toString = function () {
        return "[" + self.x + "," + self.y + "]";
    };
    return self;
}

function isValidPosition(point, map) {
    var x = point.x;
    var y = point.y;
    //logger.trace("    checking isValidPosition: " + point.toString());
    return (x >= 0 && x < Object.keys(map).length && y >= 0 && y < map[0].length);
}

function isVisited(point, visited) {
    //logger.trace('    checking isVisited: [' + point.x + ',' + point.y + ']');
    var p = visited[point.x][point.y];
    if (typeof p == "object") {
        return true;
    } else {
        return p == 1;
    }
}

function isAcessable(point, map) {
    //logger.trace("    checking isAcessable: " + point.toString());
    return map[point.x][point.y] == 1;
}

function getPointsAround(point) {
    var x = point.x;
    var y = point.y;
    return [new Point(x - 1, y, point), new Point(x + 1, y, point), new Point(x, y - 1, point), new Point(x, y + 1, point)];
}

function getNextPoints(point, map, visited) {
    //logger.trace("  getNextPoints: " + point.toString());
    var nexts = getPointsAround(point);
    var result = [];
    nexts.map(function (next) {
        if (isValidPosition(next, map) && isAcessable(next, map) && !isVisited(next, visited)) {
            result.push(next);
        }
    });
    return result;
}

function extractFullPath(point) {
    var result = [];
    var path = point.toString();
    while (point.parent) {
        result.push(point);
        point = point.parent;
        path = path + "<-"+point.toString();
    }
    result.push(point);
    logger.trace(path);
    return result;
}

function go(startPoint, endPoint, map, visited) {
    var queue = [];
    var current;
    var nexts;

    queue.push(startPoint);
    while (queue.length > 0) {
        current = queue.shift();
        //logger.trace('processing from queue: [' + current.x + ',' + current.y + ']');
        if (current.equals(endPoint)) {
            return extractFullPath(current);
        }
        visited[current.x][current.y] = current;

        nexts = getNextPoints(current, map, visited);

        nexts.map(function (next) {
            queue.push(next);
        });
    }
}
