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

function CounterObject() {
    this.currentValue = 0;

    this.inc = function () {
        return ++this.currentValue;
    }
}

function SafeCounter() {
    var currentValue = 0;
    return function () {
        return ++currentValue;
    }
}

function SafeExtendedCounter() {
    var currentValue = 0;

    return {
        inc: function () {
            return ++currentValue;
        },
        get: function () {
            return currentValue;
        },
        reset: function () {
            currentValue = 0;
        }
    };
}

var sayHelper = (function () {
    var name = "";
    var HI_MESSAGE = "Hi, ";
    var HELLO_MESSAGE = "Hello, ";
    return {
        setName: function (nameValue) {
            name = nameValue;
        },
        sayHi: function () {
            return HI_MESSAGE + name;
        },
        sayHello: function () {
            return HELLO_MESSAGE + name;
        }
    }
})();