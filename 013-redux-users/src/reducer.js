import {INITIAL_STATE, addUser, updateUser, deleteUser} from "./core";
import {ADD_USER, UPDATE_USER, DELETE_USER} from "./actions";

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER:
    return addUser(state, action.payload);
  case UPDATE_USER:
    return updateUser(state, action.payload);
  case DELETE_USER:
    return deleteUser(state, action.payload)
  }
  return state;
}
