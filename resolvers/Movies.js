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
    },
    async allGenres (){
      return (await Genre.find()).map(IdMapper)
    },
    async allMedias (){
      return (await Media.find()).map(IdMapper)
    },  

  },
  Mutation: {
    async createActor(_, {input} ){
      return Actor.create(input);
    },
    async createGenre(_, {input} ){
      return Genre.create(input);
    },
    async createMedia(_, {input} ){
      return Media.create(input);
    },
    async createMovie(_, {input} ){
      console.log(arguments);
      return Movie.create(input);
    },
  }
};