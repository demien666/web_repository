import { User } from "../src/domain/User";
import { addUser, deleteUser, updateUser } from "../src/core";
import { expect, assert } from 'chai';

describe('application logic', () => {
    const user1 = new User("Joe", "joe@email.com");
    const user2 = new User("Huan", "huan@email.com");
    const initialState = { users: [], groups: [] };

    describe('User', () => {

        it('should be valid created by constructor User object', () => {
            expect(user1.getName()).to.equal("Joe");
            expect(user1.getEmail()).to.equal("joe@email.com");

        });
    });

    describe('Core', () => {

        it('should add user', () => {
            let newState = addUser(initialState, user1);
            newState = addUser(newState, user2);
            expect(initialState.users.length).to.equal(0);
            expect(newState.users.length).to.equal(2);

            const createdUser1 = newState.users[0];
            assert.equal(createdUser1.getId(), 1);
            assert.equal(createdUser1.getName(), "Joe");
            assert.equal(createdUser1.getEmail(), "joe@email.com");

            const createdUser2 = newState.users[1];
            assert.equal(createdUser2.getId(), 2);
        });


        it('should delete user', () => {            
                let newState = addUser(initialState, user1);
                let createdUser1 = newState.users[0];
                newState = deleteUser(newState, user1);
                assert.equal(newState.users.length, 0);
            });

        it('should update user', () => {
            let newState = addUser(initialState, user1);
            const createdUser1 = newState.users[0];
            createdUser1.update("updatedName", "updated@email.com");
            newState = updateUser(newState, user1);
            let updatedUser1 = newState.users[0];
            assert.equal(updatedUser1.getId(), createdUser1.getId());
            assert.equal(updatedUser1.getName(), "updatedName");
            assert.equal(updatedUser1.getEmail(), "updated@email.com");

            assert.equal(newState.users.length, 1);
        });



    });
})