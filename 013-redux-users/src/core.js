export function addUser(state, user) {
    let users = state.users.slice();
    users.push(user);
    return {
        users: users,
        groups: state.groups
    }
    
}