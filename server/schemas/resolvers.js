const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            return await User.findById(args.id);
        },
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            
            return;
        },
        addUser: async(parent, {username, email, password}) => {
            const newUser = User.create( { username, email, password })
            const token = signToken(newUser);
            return {token, newUser};
        }
    }
};

module.exports = resolvers;