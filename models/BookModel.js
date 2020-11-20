const { sequelize, Sequelize } = require("./index");
/**
 * @description:Model for books table
 * @param {object} sequelizeObject
 * @param {object} Sequelize
 */
module.exports = (sequelizeObject, Sequelize) => {
  const Book = sequelizeObject.define(
    "book",
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Book;
};
