import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { sql } from './db.js';

// defining types, query for get, mutation for insert update delete
const typeDefs = `#graphql
  type Student {
    id: ID!
    name: String!
    isHosteler: Boolean!
    mark: Float!
    course: String!
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
  }

  type Mutation {
    addStudent(name: String!, isHosteler: Boolean!, mark: Float!, course: String!): Student!
  }
`;

// function definitions for query and different mutations
const resolvers = {
  Query: {
    students: async () => {
      return await sql`
        SELECT id, name, is_hosteler, mark::float, course 
        FROM students 
        ORDER BY id ASC
      `;
    },
    student: async (_, { id }) => {
      const [student] = await sql`
        SELECT id, name, is_hosteler, mark::float, course 
        FROM students 
        WHERE id = ${id}
      `;
      return student || null;
    },
  },
  Mutation: {
    addStudent: async (_, { name, isHosteler, mark, course }) => {
      const [newStudent] = await sql`
        INSERT INTO students (name, is_hosteler, mark, course)
        VALUES (${name}, ${isHosteler}, ${mark}, ${course})
        RETURNING id, name, is_hosteler, mark::float, course
      `;
      return newStudent;
    },
  },
};

// defining server
const server = new ApolloServer({ typeDefs, resolvers });

// starting server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Apollo Standalone Server ready at ${url}`);