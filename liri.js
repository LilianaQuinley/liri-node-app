
var fs = require('fs')
var config = require("dotenv").config();
var keys = require("./keys")
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
console.log(process.argv)


var command = process.argv[2]
var selection = process.argv[3]

switch(command){
    
    case "concert-this":
    concert();
    break;

    case 'movie-this':
    movies()
    break;

    case 'spotify-this-song':
    music()
    break;

    case 'do-what-it-says':
    random()
    break;

}

// If the "band" function is called...
function concert() {
    
  // Then run a request to search the Bands in Town Artist Events API 
  request("https://rest.bandsintown.com/artists/" + selection + "/events?app_id=codingbootcamp", function(error, response, body) {
      console.log("First time getting artist info for " + selection)
      //console.log(body)
      //console.log(error)

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
        
        //console.log("This is the body parsed");
        var myResults = JSON.parse(body);
        //console.log(myBody)
        //console.log(venues)
        for (var i=0;i<myResults.length;i++) {
            console.log("The name of the venue is: " + myResults[i]["venue"]["name"]);
            console.log("The venue location is: " + myResults[i]["venue"]["city"]);
            console.log("The date of the event is: " + Date(myResults[i]["datetime"]));
            console.log("")
        }   
     }
  });
}
// If the "music" function is called...

function music() {

// // Then run a request to search the spotify API 
  spotify.search({ type: 'track', query: selection }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;  //from spotify npm docs
    }
    else{
    var songInfo = data.tracks.items[0];
    console.log("The Artist is: " + songInfo.artists[0].name)
    console.log("The name of the song is: " + songInfo.name)
    console.log("The album that the song is from: " + songInfo.album.name)
    console.log("A preview link of the song: " + songInfo.preview_url)

    };
  });
}  


  // If the "movie" function is called...
  function movies() {

  // Then run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=" + selection + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      var myResults = JSON.parse(body);

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title of the movie: " + myResults.Title);
      console.log("Year the movie came out: " + myResults.Year);
      console.log("IMDB Rating of the movie: " + myResults.imdbRating);
      console.log("Rotten Tomatoes Rating of the movie: " + myResults.Ratings[1].Value);
      console.log("Country where the movie was produced: " + myResults.Country);
      console.log("Language of the movie: " + myResults.Language);
      console.log("Plot of the movie " + myResults.Plot);
      console.log("Actors in the movie " + myResults.Actors);
    }
    else {
      console.log("This failed with " + response.statusCode)
    }
  });
}

// If the "random" function is called...
function random() {

  fs.readFile("random.txt","utf8",function(err,data) {
    if (err){
        return console.log(error);
    } 
    console.log(data)

    var dataArr = data.split(",");

    console.log(dataArr);
    command = dataArr[0];
    selection = dataArr[1];
    console.log(command)
    console.log(selection)

    switch(command){
    
      case "concert-this":
      concert();
      break;
  
      case 'movie-this':
      movies()
      break;
  
      case 'spotify-this-song':
      music()
      break;
  
  }


});

}

