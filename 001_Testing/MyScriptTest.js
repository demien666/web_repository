describe("Point class", function() {

  it("EQUALS function for another point with the same coordinates should return TRUE", function() {
    var point=new Point(1,2);
    var theSamePoint=new Point(1,2);
    assert.equal(point.equals(theSamePoint), true);
  });

  it("EQUALS function for another point with the different coordinates should return FALSE", function() {
    var point=new Point(1,2);
    var anotherPoint=new Point(1,3);
    assert.equal(point.equals(anotherPoint), false);
  });

});
