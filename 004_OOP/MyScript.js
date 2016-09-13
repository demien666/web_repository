/*jslint browser: true*/
/*global console*/

'use strict';

function FuncPoint(x, y) {
    var _x = x, _y = y, self = this;

    self.getX = function () {
        return _x;
    };
    self.getY = function () {
        return _y;
    };
    self.toString = function () {
        return "[" + _x + "," + _y + "]";
    };
    return self;
}

function FuncColoredPoint(x, y, color) {
    FuncPoint.call(this, x, y);
    var _color = color, self = this;

    self.getColor = function () {
        return _color;
    };

    var parentToString = self.toString;
    self.toString = function () {
        return parentToString() + "#" + _color;
    };

    return self;
}


function ProtoPoint(x, y) {
    this.x = x;
    this.y = y;
}


ProtoPoint.prototype.getX = function () {
    return this.x;
};

ProtoPoint.prototype.getY = function () {
    return this.y;
};

ProtoPoint.prototype.toString = function () {
    return "[" + this.x + "," + this.y + "]";
};

function ProtoColoredPoint(x, y, color) {
    ProtoPoint.call(this, x, y);
    this.color = color;
}

ProtoColoredPoint.prototype = Object.create(ProtoPoint.prototype);

ProtoColoredPoint.prototype.getColor = function () {
    return this.color;
};

ProtoColoredPoint.prototype.toString = function () {
    return ProtoPoint.prototype.toString.call(this) + "#" + this.color;
};

