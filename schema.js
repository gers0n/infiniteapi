import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
type Product {
  _id: ID!
  title: String!
  qty: Int
 }
 type Actor{
    _id: ID!,
    name: String!
}

 input ProductInput {
     title: String!
     qty: Int
 }
 input ActorInput {
    name: String!
 }

 type Query {
    allProducts: [Product]
    allActors : [Actor]
   }
 type Mutation {
     createProduct(input: ProductInput) : Product
     createActor(input: ActorInput) : Actor
 }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
