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
        const newRow = $("<div>").prependTo($("#displayResults"));
        // newRow.attr("class", "row");
        const newCol = $("<div>").prependTo(newRow);
        newCol.attr("class", "col-4");
        // Card 
        const newCard = $("<div>").prependTo(newCol);
        newCard.attr("class", "card border-success mb-3");
        newCard.attr("style", "max-width: 18rem;");
        // Card Header
        const newP = $("<div>");
        newP.addClass("card-header bg-transparent border-success text-success");
        newP.attr("id", element.id);
        newP.text("--> " + element.name);
        newP.appendTo(newCard);
        // Card Body
        const newBody = $("<div>").appendTo(newCard);
        newBody.addClass("card-body text-success");
        // Center Image
        const image = $("<img>").appendTo(newBody);
        image.attr("src", element.background_image);
        image.attr("width", 200 + "height", 200);
        // Card Footer
        const newFoot = $("<div>").appendTo(newCard);
        newFoot.addClass("card-footer bg-transparent border-success");
        // Footer Contents
        const genre = $("<p>");
        genre.text("Genre: " + element.tags[0].name);
        genre.appendTo(newFoot);
        const release = $("<p>");
        release.text("Released: " + element.released);
        release.appendTo(newFoot);
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
