const baseSearchUrl = "https://api.rawg.io/api/games?key=";
const apiKey = "72506a506521467da93378cfb7fc9829";
let searchString;
const searchQueryURL =
  baseSearchUrl +
  apiKey +
  "&search=" +
  searchString +
  "&ordering=-rating&exclude_additions=true";

const baseGameDetailsUrl = "https://api.rawg.io/api/games/";
let gameId;
const gameDetailsURL = baseGameDetailsUrl + gameId + "?key=" + apiKey;

function getGameSearchResults(searchString) {
  searchString = searchString;

  $.ajax({
    url: searchQueryURL,
    method: "GET"
  })
    .then(function(data) {
      return data;
    })
    .catch(err => {
      console.log(error);
    });
}

function getGameDetails(gameId) {
  gameId = gameId;

  $.ajax({
    url: gameDetailsURL,
    method: "GET"
  })
    .then(function(data) {
      return data;
    })
    .catch(err => {
      console.log(error);
    });
}

exports.getGameSearchResults = getGameSearchResults;
exports.getGameDetails = getGameDetails;
