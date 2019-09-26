require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
// node modules defined 
//command line args
var command = process.argv[2];
var query = process.argv.slice(3).join(' ');
var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
var queryConcert = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
//var spotifyQuery =
//console.log(command);
runCommand(command, query);

//function that runs on 'command' and arg 'query'
function runCommand(command, query) {
    //if command = spotify 
    if (command === "spotify-this-song") {
        spotify.search({ type: 'track', query: query }).then(
            function (data) {
                // prints the artists, name, href, album using spotify
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].artists);
                console.log(data.tracks.items[0].album);
                console.log(data.tracks.items[0].href);
                // Artist(s)
                //loop to print all the items in response
                // for (item of data.tracks.items) {
                //     //console.log(item)
                //     console.log(item.href);
                //     console.log(item.name);
                //     console.log(item.artists);
                //     console.log(item.album);
                // }
            }
            , function (error) { console.log(error); });
    }
    //if command = movie....
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
    //if command = concert....
    else if (command === "concert-this") {
        axios.get(queryConcert).then(function (response) {
            // console.log(response);
            console.log(response.data[0].venue.name);
            console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
            console.log(response.data[0].venue.city);
            //console.log(response.data.venue);
        }).catch(function (error) {
            console.log(error);
        });
    }
    //if command = do-what-
    else if (command === 'do-what-it-says') {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                console.log(error);
                return;
            }
            var dataArray = data.split(",");
            runCommand(dataArray[0], dataArray[1]);
        })
    }
}