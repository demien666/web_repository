define(function () {
        function idNameFormat(object) {
            return "[" + object.id + "]" + object.name;
        }

        return {
            logUser: function (user) {
                console.log("user:" + idNameFormat(user));

            },
            logDepartment: function (department) {
                console.log("department:" + idNameFormat(department) + ". users:" + department.getUsers().toString());
            }
        }
    }
);