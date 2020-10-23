const db = require("../models");

module.exports = function(app) {
  app.post("/api/addgame", (req, res) => {
    const userId = req.user.id;

    db.Game.create({
      name: req.body.name,
      genre: "game",
      published_year: req.body.published_year,
      link_to_game: req.body.link_to_game,
      link_to_screenshot: req.body.link_to_screenshot,
      UserId: userId
    })
      .then(() => {
        res.end();
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
};
