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
const emptyFunc = x => x;
const filterDatesMapper = f => {
  return {
    ...f,
    released: {
      $gte: new Date(f.released.from),
      $lt: new Date(f.released.to)
    }
  }
};
export const resolvers = {
  Query: {
    // allActors,
    // getActor,
    async allMovies(parent, {filter, orderBy, page=1, pageSize=10}) {
      const dateMapper = movie => {
        // movie.released = "{1}/{2}/{3}".format(movie.released.getDay(), movie.released.getMonth(), movie.released.getYear);
        return movie;
      };
      
      console.log('args', arguments[1]);
      if(filter) {
        return (
          await Movie
            .find(filterDatesMapper(filter))
            .sort(orderBy)
            .skip(page)
            .limit(pageSize)
          )
          .map(Resolver)
          .map(dateMapper)
      } else {
        return (
          await Movie.find()
          .sort(orderBy)
          .skip(page)
          .limit(pageSize)
          )
          .map(Resolver).map(dateMapper)
      }
    },
    async getLastMovies(){
      var date = new Date();
      let filter = {
        released: {
          $gte: date.getFullYear().toString(),
          $lt: (date.getFullYear()+1).toString()
        }
      };
      return (
        await Movie
          .find(filter)
          .sort({released: -1})
          .limit(10)
        )
        .map(Resolver)
    }
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
