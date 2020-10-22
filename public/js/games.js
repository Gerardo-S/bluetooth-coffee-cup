$(document).ready(() => {
  const params = new URL(document.location).searchParams;
  const searchTerm = params.get("query");

  const searchQueryURL =
    "https://api.rawg.io/api/games?key=" +
    "72506a506521467da93378cfb7fc9829" +
    "&search=" +
    searchTerm +
    "&ordering=-rating&exclude_additions=true";

  if (!searchTerm) {
    return;
  }

  $.get(searchQueryURL)
    .then(data => {
      console.log(data.results);
      console.log(searchQueryURL);

      data.results.forEach(element => {
        // const newRow = $("<div>").prependTo($("#displayResults"));
        // newDiv.attr("class", element.id);
        // const newCol = $("<div>").prependTo($("#displayResults"));
        // newDiv.attr("id", element.id);
        // const newP = $("<p>");
        // newP.addClass("gameBlock");
        // newP.attr("id", element.id);
        // newP.text(element.name);
        // newP.appendTo(newDiv);
      });

      // name: element.name,
      // background_image: element.background_image,
      // id: element.id,
      // releases: element.released
      // genre: element.tags[0].name
    })
    .catch(err => {
      console.log(err);
    });
});
