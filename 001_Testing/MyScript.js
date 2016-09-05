/*jslint browser: true*/
/*global console*/

var isTraceEnabled = true;

function getLogger() {
    'use strict';
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
    "use strict";
	var self = Object.create(null);
    self.x = x;
    self.y = y;
    self.equals = function (anotherPoint) {
        return (self.x === anotherPoint.x && self.y === anotherPoint.y);
    };
	return self;
}

function isValidPosition(point, map) {
    'use strict';
    var x = point.x;
    var y = point.y;
    logger.trace('checking [' + x + ',' + y + ']');
    return (x >= 0 && x < Object.keys(map).length && y >= 0 && y < map[0].length);
}

function isVisited(point, visited) {
    'use strict';
    return visited[point.x][point.y] == null;
}

function getPositionsAround(point) {
    'use strict';
    var x = point.x;
    var y = point.y;
    //logger.trace('positions around [' + x + ',' + y + ']');
    return [new Point(x - 1, y), new Point(x + 1, y), new Point(x, y - 1), new Point(x, y + 1)];
}
