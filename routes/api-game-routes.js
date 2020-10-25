const db = require("../models");

module.exports = function(app) {
  app.post("/api/addgame", (req, res) => {
    if (!req.user) {
      console.log("You must be logged in to save games!");
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
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

      app.get("/api/addgame", (req, res) => {
        const query = {};
        if (req.user.id) {
          query.UserId = req.user.id;
        }
        db.Game.findAll({
          where: query,
          include: [db.User]
        }).then(dbGame => {
          res.json(dbGame);
        });
      });

      app.get("/api/addgame/:id", (req, res) => {
        db.Game.findOne({
          where: {
            id: req.params.id
          },
          include: [db.User]
        }).then(dbGame => {
          console.log(dbGame);
          res.json(dbGame);
        });
      });

      app.delete("/api/addgame/:id", (req, res) => {
        db.Game.destroy({
          where: {
            id: req.params.id
          }
        }).then(dbGame => {
          console.log(dbGame);
          res.json(dbGame);
        });
      });
    }
  });
};
