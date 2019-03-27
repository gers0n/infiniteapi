var newGenres = [];

var movies = db.getCollection('movies').find({}, {genres: 1});
var existentGenres = db.getCollection('genres').find({}).map(g => g.name);

movies.forEach(function(m, index){
    var gs = m.genres.filter(function(g, i, a){
        return newGenres.indexOf(g) < 0 && existentGenres.indexOf(g) < 0;
    });
    
    newGenres = newGenres.concat(gs);
});

db.genres.insertMany(newGenres.map(g => {
    return {name:g}
}))

printjson(newGenrese);