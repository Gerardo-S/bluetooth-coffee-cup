$(document).ready(() => {
  $(document).on("click", ".del-btn", handlePostDelete);

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data")
    .then(data => {
      $(".member-name").text(data.email);
      data.Games.forEach(element => {
        const newRow = $("<div>").appendTo($("#displayResults"));
        // newRow.attr("class", "row");
        const newCol = $("<div>").prependTo(newRow);
        newCol.attr("class", "col");

        // Card
        const newCard = $("<div>").prependTo(newCol);
        newCard.attr("class", "card h-100 text-center border-success mb-3");
        newCard.attr("style", "max-width: 18rem;");
        newCard.data("data", element.id);

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
        image.attr("src", element.link_to_screenshot);
        image.attr("height", 200);
        image.css({ "object-fit": "contain" });
        image.addClass("card-img");
        // Card Footer
        const newFoot = $("<div>").appendTo(newCard);
        newFoot.addClass("card-footer bg-transparent border-success");
        // <i class="far fa-save"></i>
        // Delete Button
        const button = $("<button>");
        button.text(" Remove from Top 10");
        button.attr("class", "del-btn btn btn-dark").appendTo(newCard);
        const del = $("<i>");
        del.addClass("fas fa-dumpster");
        del.prependTo(button);
        // Footer Contents
        const genre = $("<p>");
        // genre.text("Genre: " + element.tags[0].name);
        genre.appendTo(newFoot);
        const release = $("<p>");
        release.text("Released: " + element.published_year);
        release.appendTo(newFoot);
      });
    })
    .catch(err => {
      console.log(err);
    });
  function deleteGame(id) {
    $.ajax({
      method: "DELETE",
      url: `/api/addgame/${id}`
    }).then(() => {
      location.reload();
    });
  }
  function handlePostDelete() {
    const currentGame = $(this)
      .siblings(".card-header")
      .attr("id");

    deleteGame(currentGame);
    console.log("currentGame id " + currentGame);
  }
});
