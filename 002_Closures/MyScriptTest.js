/*global beforeEach, describe, assert, it, CounterObject, SafeCounter, SafeExtendedCounter, sayHelper*/
describe("Main test", function () {
    "use strict";

    describe("CounterObject", function () {
        it("should be independent counters on every creation of counter object", function () {
            var counter1 = new CounterObject();
            assert.equal(counter1.inc(), 1);
            assert.equal(counter1.inc(), 2);

            var counter2 = new CounterObject();
            assert.equal(counter2.inc(), 1);
            assert.equal(counter2.inc(), 2);
        });

        it("should be possible to change current value because it unprotected at all", function () {
            var counter1 = new CounterObject();
            assert.equal(counter1.inc(), 1);
            assert.equal(counter1.inc(), 2);

            counter1.currentValue = 9;
            assert.equal(counter1.inc(), 10);
        });

    });

    describe("SafeCounter", function () {
        it("should be independent counters on every call of SafeCounter() function", function () {
            var counter1 = new Object();
            counter1.inc = SafeCounter();
            assert.equal(counter1.inc(), 1);
            assert.equal(counter1.inc(), 2);

            var counter2 = new Object();
            counter2.inc = SafeCounter();
            assert.equal(counter2.inc(), 1);
            assert.equal(counter2.inc(), 2);
        });
    });

    describe("SafeExtendedCounter", function () {
        it("should be independent counters on every call of SafeExtendedCounter() function", function () {
            var counter1 = SafeExtendedCounter();
            assert.equal(counter1.inc(), 1);
            assert.equal(counter1.inc(), 2);

            var counter2 = SafeExtendedCounter();
            assert.equal(counter2.inc(), 1);
            assert.equal(counter2.inc(), 2);
        });

        it("should be GET function for getting current value", function () {
            var counter1 = SafeExtendedCounter();
            assert.equal(counter1.inc(), 1);
            assert.equal(counter1.get(), 1);
        });

        it("should be RESET function for reseting counter to zero", function () {
            var counter1 = SafeExtendedCounter();
            assert.equal(counter1.inc(), 1);
            assert.equal(counter1.inc(), 2);
            counter1.reset();
            assert.equal(counter1.get(), 0);
        });
    });

    describe("sayHelper", function () {
        sayHelper.setName("Joe");
        it("should be [Hi, Joe] when we call sayHelper.sayHi()", function () {
            assert.equal(sayHelper.sayHi(), "Hi, Joe");
        });
        it("should be [Hello, Joe] when we call sayHelper.sayHello()", function () {
            assert.equal(sayHelper.sayHello(), "Hello, Joe");
        });
    });


});

