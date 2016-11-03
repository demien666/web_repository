function User(id, name)  {
  this.id=id;
  this.name=name;
  this.toString = function() {
     return name;
  }
}