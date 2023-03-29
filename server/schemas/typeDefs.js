const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID 
        authors: [String]
        description: String
        title: String
        # image:
        # link:
    }

    type Auth {

    }

    type Query {
        
    }
`;

module.exports = typeDefs;