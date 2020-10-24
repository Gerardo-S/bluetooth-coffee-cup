$(document).ready(() => {
  const params = new URL(document.location).searchParams;
  const searchEmail = params.get("query");

  if (!searchEmail) {
    return;
  }
  $.get(`/api/user_search/${searchEmail}`)
    .then(data => {
      if (!data.first_name) {
        return;
      }
      const element = data;

      const newRow = $("<div>").appendTo($("#displayResults"));
      // newRow.attr("class", "row");
      const newCol = $("<div>").prependTo(newRow);
      newCol.attr("class", "col");
      // Card
      const newCard = $("<div>").prependTo(newCol);
      newCard.attr("class", "card h-100 text-center border-success mb-3");
      newCard.attr("style", "max-width: 18rem;");
      // Card Header
      const newP = $("<div>");
      newP.addClass("card-header bg-transparent border-success text-success");
      newP.attr("id", element.id);
      newP.text("--> " + element.first_name + " " + element.last_name);
      newP.appendTo(newCard);
      // Card Body
      const newBody = $("<div>").appendTo(newCard);
      newBody.addClass("card-body text-success");
      // Card Footer
      const newFoot = $("<div>").appendTo(newCard);
      newFoot.addClass("card-footer bg-transparent border-success");
      // <i class="far fa-save"></i>
      // Footer Contents
      const email = $("<p>");
      email.text("Email: " + element.email);
      email.appendTo(newFoot);
    })
    .catch(err => {
      console.log(err);
    });

  //   $("#displayResults").on("click", event => {
  //     event.preventDefault();
  //     // console.log($(event.target).data("link"));
  //     let gameYear;

  //     if ($(event.target).data("released")) {
  //       gameYear = parseInt(
  //         $(event.target)
  //           .data("released")
  //           .slice(0, 4)
  //       );
  //     }

  //     $.post("/api/addgame", {
  //       name: $(event.target).data("name"),
  //       link_to_screenshot: $(event.target).data("image"),
  //       link_to_game: $(event.target).data("link"),
  //       id: $(event.target).data("id"),
  //       published_year: gameYear,
  //       genre: "game"
  //     })
  //       .then(() => {
  //         console.log("hi");
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
});
