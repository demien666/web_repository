export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export function addUserAction(user) {
    return {
        type: ADD_USER,
        payload: user
    }
}

export function updateUserAction(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function deleteUserAction(user) {
    return {
        type: DELETE_USER,
        payload: user
    }
}