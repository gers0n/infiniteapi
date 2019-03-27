var genres = [];
var movies = db.getCollection('movies').find({}, {genres: 1});
movies.forEach(function(m, index){
    var gs = m.genres.filter(function(g, i, a){
        return genres.indexOf(g) < 0;
    });
    
    genres = genres.concat(gs);
});
db.genres.insertMany(genres.map(g => {
    return {name:g}
}))

printjson(genres.map(g => {
    return {name:g}
}));