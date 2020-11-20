const { sequelize, Sequelize } = require("./index");
/**
 * @description:Model for user table
 * @param {object} sequelizeObject
 * @param {object} Sequelize
 */
module.exports = (sequelizeObject, Sequelize) => {
  const User = sequelizeObject.define(
    "user",
    {
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );

  return User;
};
