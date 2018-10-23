import Product from "./models/product";

export const resolvers = {
  Query: {
    async allProducts(){
      return await Product.find()
    }
  }
};