const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
db.sequelizeObject.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db");
});
/**
 * express configurations
 */
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * different routes are imported in the app
 */
require("./routes/UserRoutes")(app); //Seperate api for Users
require("./routes/BookRoutes ")(app); //Seperate api for books
require("./routes/PrivateRoute")(app); //Seperate api for authentication and accessing private route
const PORT = process.env.PORT || 8080;
//**Server setup */
app.listen(PORT, () => {
  console.log(`"listening on port ${PORT}`);
});
