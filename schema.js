import {
    makeExecutableSchema
} from 'graphql-tools';
import {
    resolvers
} from './resolvers';

const typeDefs = `
type Product {
  _id: ID!
  title: String!
  qty: Int
 }
type Query {
  allProducts: [Product]
 }
 input ProductInput {
     title: String!
     qty: Int
 }
 type Mutation {
     createProduct(input: ProductInput) : Product
 }
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;