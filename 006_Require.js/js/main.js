require(["user", "department", "logger", "validator"], function (User, Department, Logger, Validator) {

    console.log("Hello world!");

    var user1 = new User(1, "Joe");
    var user2 = new User(2, "Black");

    var dep1 = new Department(1, "IT");
    dep1.addUser(user1);
    dep1.addUser(user2);

    if (Validator.isValid(user1) && Validator.isValid(user2) && Validator.isValid(dep1)) {
        Logger.logUser(user1);
        Logger.logUser(user2);
        Logger.logDepartment(dep1);
    } else {
        console.log("errors in validation");
    }


});