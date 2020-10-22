$(document).ready(() => {
  const baseSearchUrl = "https://api.rawg.io/api/games?key=";
  const apiKey = "72506a506521467da93378cfb7fc9829";
  let searchString;
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, log the error
      })
      .catch(err => {
        console.log(err);
      });
  }

  $(".game-submit").on("click", event => {
    event.preventDefault();
    const searchTerm = $("#searchGames")
      .val()
      .trim();

    if (!searchTerm) {
      return;
    }
    alert("zelda");
    console.log(searchTerm);
    searchString = searchTerm;
    const searchQueryURL =
      baseSearchUrl +
      apiKey +
      "&search=" +
      searchString +
      "&ordering=-rating&exclude_additions=true";

    $.get({
      url: searchQueryURL,
      method: "GET"
    })
      .then(function(data) {
        console.log(data.results);
        console.log(searchQueryURL);

        const games = data.results.map(game => {
          return {
            name: game.name,
            background_image: game.background_image,
            id: game.id,
            releases: game.released
          };
        });
        $.post({
          url: `/api/games/${searchString}`,
          data: { data: games }
        }).then(res => {
          console.log(res);
        });
      })
      .catch(err => {
        console.log(error);
      });
  });
});
