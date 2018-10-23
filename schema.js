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
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;