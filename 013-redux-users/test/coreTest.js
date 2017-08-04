import { User } from "../src/domain/User";
import { addUser } from "../src/core";
import { expect } from 'chai';

describe('application logic', () => {
    let user = new User("Joe", "joe@email.com");
    describe('User', () => {
        
        it('should be valid User object', () => {
            expect(user.getName()).to.equal("Joe");
            expect(user.getEmail()).to.equal("joe@email.com");

        });
    });

    describe('Core', () => {
        let initialState = { users: [], groups: [] };
        
        let newState = addUser(initialState, user);

        it('should add user to initial state object', () => {
            expect(initialState.users.length).to.equal(0);
            expect(newState.users.length).to.equal(1);
            //expect(user.getEmail()).to.equal("joe@email.com");

        });
    });
})