import { expect } from 'chai';
import { makeStore } from '../src/store';
import { addUserAction, updateUserAction, deleteUserAction } from "../src/actions";
import { User } from "../src/domain/User";

describe('store', () => {

    it('is a Redux store configured with the correct reducer', () => {
        const store = makeStore();
        store.dispatch(addUserAction(new User("Joe", "joe@email.com")));
        expect(store.getState().users[0].getName()).to.equal("Joe");
    });

});