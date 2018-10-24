
var config = require("dotenv").config();
var keys = require("./keys")
//var spotify = new Spotify(keys.spotify);
var request = require("request");
console.log(process.argv)


var command = process.argv[2]
var selection = process.argv[3]

switch(command){
    
    case "concerts":
    concert();
    break;

    case 'movies':
    movies()
    break;

    case 'music':
    music()
    break;

}

// If the "band" function is called...
function concert() {

    var artist;
    
  // Then run a request to search the Bands in Town Artist Events API 
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {
      console.log("First time getting artist info for " + artist)
      //console.log(body)
      //console.log(error)

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
        //.log(body)
        console.log("This is the body parsed");
        var myResults = JSON.parse(body);
        //console.log(myBody)
        //console.log("######################## length is " + myBody.length)
        //var venues = myBody[0];
        //console.log("---------------- venue ----------------------")
        //console.log(venues)
        for (var i=0;i<myResults.length;i++) {
            console.log("The name of the artist is: "+ artist);
            console.log("The name of the venue is: " + myResults[i]["venue"]["name"]);
            console.log("The venue location is: " + myResults[i]["venue"]["city"]);
            console.log("The date of the event is: " + Date(myResults[i]["datetime"]));
            console.log("")
        }   
     }
  });
}
// If the "music" function is called...
function concert() {


// Then run a request to search the spotify API 
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("The song's name: " + JSON.parse(body).songName);
      console.log("A preview link of the song from Spotify: " + JSON.parse(body).date);
      console.log("The album that the song is from " + JSON.parse(body).date);
      
    } else {
      console.log("The Sign " + JSON.parse(body).date);
    
    }
  });
}
  // If the "movie" function is called...
  function movie() {

  // Then run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    }
    else {
      console.log("This failed with " + response.statusCode)
    }
  });
}