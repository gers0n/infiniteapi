import Product from "./models/product";
import Actor from "./models/Actor";
import { stringify } from "querystring";

const IdMapper = (docs) => {
  docs.id = docs._id.toString();
  return docs
}

export const resolvers = {
  Query: {
    async allProducts(){
      return (await Product.find()).map(IdMapper);
    },
    async allActors(){
      return (await Actor.find()).map(IdMapper);
    },
    async getActor (_id){
      return await Actor.findOne({id: _id})
    }
  },
  Mutation: {
    async createProduct(_, { input }) {
      return await Product.create(input);
    },
    async createActor(_, {input} ){
      return Actor.create(input);
    }
  }
};