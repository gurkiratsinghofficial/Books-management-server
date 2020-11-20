const dbConfig = require("../config/DatabaseConfig");
/**
 * an instance of sequelize is created
 */
const Sequelize = require("sequelize");
const sequelizeObject = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelizeObject = sequelizeObject;

db.users = require("./UserModel.js")(sequelizeObject, Sequelize);
db.books = require("./BookModel.js")(sequelizeObject, Sequelize);

module.exports = db;
