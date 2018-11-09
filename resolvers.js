import Actor from "./models/Actor";
import Movie from "./models/Movie";

const IdMapper = (docs) => {
  docs.id = docs._id.toString();
  return docs
}

export const resolvers = {
  Query: {
    async allActors(){
      return (await Actor.find()).map(IdMapper);
    },
    async getActor (_id){
      return await Actor.findOne({id: _id})
    },
    async allMovies (){
      return (await Movie.find()).map(IdMapper)
    }
  },
  Mutation: {
    async createActor(_, {input} ){
      return Actor.create(input);
    }
  }
};