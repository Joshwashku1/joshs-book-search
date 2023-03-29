const { Book, User } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, args) => {
            return await User.findById(args.id);
        },
    },

    Mutation: {
        
    }
};

module.exports = resolvers;