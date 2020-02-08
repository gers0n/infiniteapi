import Actor from "./models/Actor";
import Movie from "./models/Movie";
import Genre from "./models/Genre";
import TVShow from "./models/TVShow";

const Resolver = docs => {
  docs.id = docs._id.toString();
  return docs;
};
const allActors = async () => {
  return (await Actor.find()).map(Resolver);
};
const getActor = async _id => {
  return await Actor.findById(_id);
};
const createMovieTextIndex = () => {
  Movie.createIndex(
    {
      title: "text",
      year: "text",
      synopsis: "text",
      genres: "test"
    },
    {
      weights: {
        title: 5,
        year: 1,
        synopsis: 3,
        genres: 1
      },
      name: "TextIndex"
    }
  );
};
const emptyFunc = x => x;
const filterDatesMapper = f => {
    if (f.released) {
      var released = {};
      if(f.released.from) released.$gte = new Date(f.released.from)
      if(f.released.to) released.$lte = new Date(f.released.to)
      f = {
        ...f,
        released: released
      };
    }
  if (f.dateUpdated) {
    var dateUpdated = {}
    if(f.dateUpdated.from) dateUpdated.$gte = new Date(f.dateUpdated.from)
    if(f.dateUpdated.to) dateUpdated.$lte = new Date(f.dateUpdated.to)
    f = {
      ...f,
      dateUpdated: dateUpdated
    };
  }
  if (f.search) {
    f = {
      ...f,
      $text: { $search: f.search },
      search: null
    };
  }
  return f;
};
const genresStringMapper = (genre)=>{
  return {
    name: genre
  }
};
export const resolvers = {
  Query: {
    // allActors,
    // getActor,
    async allMovies(parent, { filter, orderBy, limit, skip }) {
      
      if (filter) {
        if(filter.genres){
          filter = {...filter, genres: {$in: filter.genres || []}}
        }
        return (await Movie.find(filterDatesMapper(filter))
          .sort(orderBy)
          .skip(skip)
          .limit(limit))
          .map(Resolver)
      } else {
        return (await Movie.find()
          .sort(orderBy)
          .skip(skip)
          .limit(limit))
          .map(Resolver)
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
    },
    async getMovie(parent, { _id }) {
      if (!_id) return null;
      return await Movie.findById(_id);
    },
    async getAllGenres (){
      return await Genre.find({});
    },
    async getAllTvShows (){
      var tvShows =  await TVShow
      .find()
      .skip(0)
      .limit(16);
      console.log(JSON.stringify(tvShows[0].episodes[0]));

      return tvShows;
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
