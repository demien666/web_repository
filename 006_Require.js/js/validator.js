define(function () {

    function hasAttribute(object, attribute) {
        return object.hasOwnProperty(attribute);
    }

    return {
        isValid: function (object) {
            return hasAttribute(object, "name") && hasAttribute(object, "id");
        }
    }

});