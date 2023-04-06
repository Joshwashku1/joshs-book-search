const {  User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id});
            }
            throw new AuthenticationError('You need to be logged in!')
        },
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('No user with this email found!');
            }
            
            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async(parent, {username, email, password}) => {
            const newUser = User.create( { username, email, password })
            const token = signToken(newUser);
            return {token, newUser};
        },
        saveBook: async(parent, args, context) => {
            if(context.user) {
               const book = await Book.create({
                    ...args,
               });

               const user = await User.findOneAndUpdate(
                { _id: context.user._id},
                { $addToSet: { savedBooks: book.bookId }}
               );

               return user;
            }
            throw new AuthenticationError('You need to be logged in to save!');
        }
    }
};

module.exports = resolvers;