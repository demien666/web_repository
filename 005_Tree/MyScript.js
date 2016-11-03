/*jslint browser: true*/
/*global console*/

'use strict';

function Node(name, parent) {
    var _name = name, _parent = parent, _childNodes = [], _level = 0;

    if (parent) {
        _level = parent.getLevel() + 1;
        parent.addChild(this);
    }

    this.getName = function () {
        return _name;
    };

    this.getLevel = function () {
        return _level;
    };

    this.getParent = function () {
        return _parent;
    };

    this.toString = function () {
        var result = "";
        for (var i = 0; i < _level; i++) {
            result = result + " ";
        }
        return result + _name;
    };

    this.toHtml = function () {
        var result = "<div><br/>" + toString();
        for (var i = 0; i < _childNodes.length; i++) {
            result = result + _childNodes[i].toHtml();
        }
        result = result + "</div>";
        return result;
    };

    this.addChild = function (node) {
        _childNodes.push(node);
    };

    this.getChildNodes = function () {
        return _childNodes;
    };
}

function Tree() {
    var _root = new Node("root");

    this.addNode = function (node) {
        _root.addChild(node)
    };

    this.getNodes = function () {
        return _root;
    }

}


