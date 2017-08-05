import {User} from './domain/User';

let userGenerator = 0;

function generateUserId() {
    userGenerator++;
    return userGenerator;
}

function getUserIndex(users, user) {
    for (let i=0; i<users.length; i++) {
        let each = users[i];
        if (each.getId()===user.getId()) {
            return i;
            break;
        }
    }
    return -1;
}

export function addUser(state, user) {
    let users = state.users.slice();
    const userId = generateUserId();
    users.push(new User(user.getName(), user.getEmail(), userId));
    return {
        users: users,
        groups: state.groups
    }
    
}

export function deleteUser(state, user) {
    const users = state.users.slice();
    const index = getUserIndex(users, user);
    users.splice(index, 1);
    return {
        users: users,
        groups: state.groups
    }
    
}

export function updateUser(state, user) {
    let users = state.users.slice();
    const index = getUserIndex(users, user);
    users[index] = user;    
        
    return {
        users: users,
        groups: state.groups
    }
    
}

