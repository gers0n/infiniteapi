import Actor from "./models/Actor";
import Movie from "./models/Movie";
import {Schema} from 'mongoose'


const Resolver = docs => {
  docs.id = docs._id.toString();
  return docs;
};
const allActors = async () => {
  return (await Actor.find()).map(Resolver);
};
const getActor = async (_id) => {
  return await Actor.findOne({ id: Schema.Types.ObjectId(_id) });
};

export const resolvers = {
  Query: {
    // allActors,
    // getActor,
    async allMovies() {
      return (await Movie.find()).map(Resolver);
    },
    // async allGenres() {
    //   return (await Genre.find()).map(Resolver);
    // },
    // async allMedias() {
    //   return (await Media.find()).map(Resolver);
    // }
  },
  Mutation: {
    // async createActor(_, { input }) {
    //   return Actor.create(input);
    // },
    // async createGenre(_, { input }) {
    //   return Genre.create(input);
    // },
    // async createMedia(_, { input }) {
    //   return Media.create(input);
    // },
    async createMovie(_, { input }) {
      // console.log(arguments);
      return Movie.create(input);
    }
  }
};
