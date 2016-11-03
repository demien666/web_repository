function idNameFormat(object) {
  return "["+object.id+"]"+object.name;
}

function logUser(user) {
  console.log("user:"+idNameFormat(user));
}

function logDepartment(department) {
  console.log("department:"+idNameFormat(department)+" users:"+department.getUsers().toString());
}