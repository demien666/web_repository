/*global beforeEach, describe, assert, it, FuncPoint, FuncColoredPoint, ProtoPoint, ProtoColoredPoint*/
describe("Main test", function () {
    "use strict";

    describe("Functional inheritance", function () {
        it("should be getX, getY, toString functions in FuncPoint class", function () {
            var p = new FuncPoint(1, 2);
            assert.equal(p.getX(), 1);
            assert.equal(p.getY(), 2);
            assert.equal(p.toString(), "[1,2]");
        });

        it("should inherited getX and getY functions beside own function getColor and overriden function toString in FuncColoredPoint class", function () {
            var p = new FuncColoredPoint(2, 3, "RED");
            assert.equal(p.getX(), 2);
            assert.equal(p.getY(), 3);
            assert.equal(p.getColor(), "RED");
            assert.equal(p.toString(), "[2,3]#RED");
        });

    });

    describe("Prototype inheritance", function () {

        it("should getX, getY, toString functions added to PROTOTYPE", function () {
            var p = new ProtoPoint(4, 5);
            assert.equal(p.getX(), 4);
            assert.equal(p.getY(), 5);
            assert.equal(p.toString(), "[4,5]");
        });

        it("should be visible outside local variable - we can't make them private :(", function () {
            var p = new ProtoPoint(6, 7);
            assert.equal(p.x, 6);
            assert.equal(p.y, 7);
        });

        it("should be class ProtoColoredPoint with inherited methods form ProtoPoint", function () {
            var p = new ProtoColoredPoint(8, 9, "BLACK");
            assert.equal(p.getX(), 8);
            assert.equal(p.getY(), 9);
            assert.equal(p.getColor(), "BLACK");
            assert.equal(p.toString(), "[8,9]#BLACK");
        });

    });

});

