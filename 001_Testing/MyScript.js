function Point(x, y) {
  this.x=x;
  this.y=y;

  this.equals=function(anotherPoint) {
    return (this.x===anotherPoint.x && this.y===anotherPoint.y);
  }
}
