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
      console.log(data.results[0]);
      data.results.forEach(element => {
        const newRow = $("<div>").appendTo($("#displayResults"));
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
        // Save Button
        const button = $("<button>");        
        button.text("SAVE TO TOP 10");
        button.attr("class", "save-btn btn btn-dark").appendTo(newCard);
        button.attr("data-name", element.name);
        button.attr("data-image", element.background_image);
        // button.attr("data-genre", element.tags[0].name);
        button.attr("data-released", element.released);
        button.attr("data-id", element.id);
        button.attr("data-link", "https://rawg.io/games/" + element.slug);
        const save = $("<i>");
        save.addClass("far fa-save");
        // <i class="far fa-save"></i>
        // Footer Contents
        const genre = $("<p>");
        // genre.text("Genre: " + element.tags[0].name);
        genre.appendTo(newFoot);
        const release = $("<p>");
        release.text("Released: " + element.released);
        release.appendTo(newFoot);
        save.prependTo(button);
      });
    })
    .catch(err => {
      console.log(err);
    });

  $("#displayResults").on("click", event => {
    event.preventDefault();
    console.log($(event.target).data("link"));
    let gameYear;

    if ($(event.target).data("released")) {
      gameYear = parseInt(
        $(event.target)
          .data("released")
          .slice(0, 4)
      );
    }

    $.post("/api/addgame", {
      name: $(event.target)
        .data("name")
        .slice(0, 30),
      link_to_screenshot: $(event.target).data("image"),
      link_to_game: $(event.target).data("link"),
      id: $(event.target).data("id"),
      published_year: gameYear,
      genre: "game"
    })
      .then(() => {
        console.log("hi");
      })
      .catch(err => {
        console.log(err);
      });
  });
});
