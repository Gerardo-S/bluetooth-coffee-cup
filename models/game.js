module.exports = function(sequelize, DataTypes) {
  const Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30]
      }
    },

    publisher: {
      type: DataTypes.STRING,
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

    plot_summary: {
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

  //   Post.associate = function(models) {
  //     // We're saying that a Post should belong to an Author
  //     // A Post can't be created without an Author due to the foreign key constraint
  //     models.Post.belongsTo(models.Author, {
  //       onDelete: "CASCADE",
  //       foreignKey: {
  //         allowNull: false
  //       }
  //     });
  //   };

  return Game;
};
