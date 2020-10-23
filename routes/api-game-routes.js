const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/addgame", (req, res) => {
    // const userId = req.user.id;
    // console.log(userId);

    db.Game.create({
      name: req.body.name,
      genre: "game",
      published_year: req.body.published_year,
      link_to_game: req.body.link_to_game,
      link_to_screenshot: req.body.link_to_screenshot,
      UserId: 1
    })
      .then(() => {
        res.end();
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
};
