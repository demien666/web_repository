define(function () {

    function User(id, name) {
        this.id = id;
        this.name = name;

        this.toString = function () {
            return this.name;
        };
    }

    return User;
});