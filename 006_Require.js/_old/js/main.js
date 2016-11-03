function run() {
   var user1=new User(1, "Joe");
   var user2=new User(2, "Black");

   var dep1=new Department(1, "IT");
   dep1.addUser(user1);
   dep1.addUser(user2);

   if (isValid(user1) && isValid(user2) && isValid(dep1)) {
      logUser(user1);
      logUser(user2);
      logDepartment(dep1);
   } else {
      console.log("errors in validation");
   }

   
}