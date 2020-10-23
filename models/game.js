module.exports = function(sequelize, DataTypes) {
  const Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },

    published_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },

    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [2, 50]
    },

    link_to_game: {
      type: DataTypes.STRING,
      allowNull: false
    },

    link_to_screenshot: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Game.associate = function(models) {
    models.Game.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Game;
};
