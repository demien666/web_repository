export function User(_name, _email, _id) {
    let name = _name;
    let email = _email;
    let id = _id;

    this.getName = function() {
        return name;
    }

    this.getEmail = function() {
        return email;
    }

    this.getId = function() {
        return id;
    }

    this.update = function(_name, _email) {
        name = _name;
        email = _email;
    }

    this.toString = function() {
        return id+"-"+ name+"-"+email;
    }


}