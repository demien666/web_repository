export function User(_name, _email) {
    let name = _name;
    let email = _email;


    this.getName = function() {
        return name;
    }

    this.getEmail = function() {
        return email;
    }


}