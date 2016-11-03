function hasAttribute(object, attribute) {
   return object.hasOwnProperty(attribute);
}

function isValid(object) {
  return hasAttribute(object, "name") && hasAttribute(object, "id");
}