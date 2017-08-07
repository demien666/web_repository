import { expect, assert } from 'chai';
import { reducer } from "../src/reducer";
import { addUserAction, updateUserAction, deleteUserAction } from "../src/actions";
import {INITIAL_STATE} from "../src/core";
import {User} from "../src/domain/User";

describe('reducer', () => {

    it('should follow workflow', () => {
        let state = reducer(INITIAL_STATE, addUserAction(new User("Joe", "joe@email.com")));
        state = reducer(state, addUserAction(new User("Huan", "huan@email.com")));
        let user1 = state.users[0];
        let user2 = state.users[1];
        user2.update("updated", "updated@email.com");
        state = reducer(state, updateUserAction(user2));
        state = reducer(state, deleteUserAction(user1));
        assert.equal(state.users.length, 1);
        assert.equal(state.users[0].getName(), "updated");

    });

});

