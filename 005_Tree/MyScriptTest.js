/*global beforeEach, describe, assert, it, FuncPoint, FuncColoredPoint, ProtoPoint, ProtoColoredPoint*/
describe("Main test", function () {
    "use strict";

    describe("Node and tree test", function () {
        it("should be getX, getY, toString functions in FuncPoint class", function () {
            var n1=new Node("1");
            var n11=new Node("1.1", n1);

            var n1Childs = n1.getChildNodes();

            assert.equal(n1.getName(), "1");
            assert.equal(n1.getLevel(), 0);
            assert.equal(n11.getLevel(), 1);

            assert.equal(n1Childs.length, 1);
            assert.equal(n1Childs[0].getName(), n11.getName());
            assert.equal(n11.getParent().getName(), n1.getName());

        });


    });


});

