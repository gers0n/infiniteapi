import Product from "./models/product";
import Actor from "./models/Actor";

export const resolvers = {
  Query: {
    async allProducts(){
      return await Product.find()
    },
    async allActors(){
      return await Actor.find({});
    }
  },
  Mutation: {
    async createProduct(root, { input }) {
      return await Product.create(input);
    },
    async createActor(_,{input} ){
      return Actor.create(input);
    }
  }
};