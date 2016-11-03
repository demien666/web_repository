define(function () {

    function Department(id, name) {
        this.users = [];
        this.id = id;
        this.name = name;

        this.addUser = function (user) {
            this.users.push(user);
        };

        this.getUsers = function () {
            return this.users;
        };
    }

    return Department;

});