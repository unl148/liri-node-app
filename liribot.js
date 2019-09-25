require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];
var query = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
var queryConcert = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
//var spotifyQuery =
//console.log(command);


if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: query }).then(
        function (data) {
            console.log(data);
            for (item in data.tracks.items) {
                console.log(item.body);
                console.log(JSON.stringify(item));
            }
        }
        , function (error) { console.log(error); });
}
else if (command === "movie-this") {
    axios.get(queryUrl).then(function (response) {
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.Director);
        console.log(response.data.Rated);
        console.log(response.data.Actors);
        console.log(response.data.Plot);
        console.log(response.data.Language);
    })

        .catch(function (error) {
            console.log(error);
        });
}
else if (command === "concert-this") {
    axios.get(queryConcert).then(function (response) {
        // console.log(response);
        console.log(response.data.datetime);
        console.log(response.data.venue);
    }).catch(function (error) {
        console.log(error);
    });
}