import Actor from "./models/Actor";
import Movie from "./models/Movie";
import { Schema } from "mongoose";

const Resolver = docs => {
  docs.id = docs._id.toString();
  return docs;
};
const allActors = async () => {
  return (await Actor.find()).map(Resolver);
};
const getActor = async _id => {
  return await Actor.findOne({ id: Schema.Types.ObjectId(_id) });
};
const createMovieTextIndex = () => {
  Movie.createIndex(
    {
      title: "text",
      year: "text",
      synopsis: "text"
    },
    {
      weights: {
        title: 10,
        year: 3,
        synopsis: 5
      },
      name: "TextIndex"
    }
  );
};
const emptyFunc = x => x;
const filterDatesMapper = f => {
  let mapped = {};

  if (f.released)
    mapped = {
      ...f,
      released: {
        $gte: new Date(f.released.from),
        $lte: new Date(f.released.to)
      }
    };
  if (f.dateUpdated)
    mapped = {
      ...f,
      dateUpdated: {
        $gte: new Date(f.dateUpdated.from),
        $lte: new Date(f.dateUpdated.to)
      }
    };
    if (f.search)
    mapped = {
      ...f,
      $text: { $search: f.search },
      search: null
    };
  return mapped;
};

export const resolvers = {
  Query: {
    // allActors,
    // getActor,
    async allMovies(parent, { filter, orderBy, limit, skip }) {
      // console.log("got request", JSON.stringify( arguments));
      const dateMapper = movie => {
        // movie.released = "{1}/{2}/{3}".format(movie.released.getDay(), movie.released.getMonth(), movie.released.getYear);
        return movie;
      };

      if (filter) {
        return (await Movie.find(filterDatesMapper(filter))
          .sort(orderBy)
          .skip(skip)
          .limit(limit))
          .map(Resolver)
          .map(dateMapper);
      } else {
        return (await Movie.find()
          .sort(orderBy)
          .skip(skip)
          .limit(limit))
          .map(Resolver)
          .map(dateMapper);
      }
    },
    async getLastMovies() {
      var date = new Date();
      let filter = {
        released: {
          $gte: date.getFullYear().toString(),
          $lte: (date.getFullYear() + 1).toString()
        }
      };
      return (await Movie.find(filter)
        .sort({ released: -1 })
        .limit(10)).map(Resolver);
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
      return Movie.create(input);
    }
  }
};
