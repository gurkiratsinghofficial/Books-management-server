module.exports = (app) => {
  const users = require("../controllers/UserController");
  const verify = require("../controllers/AuthController");

  var router = require("express").Router();
  /**
   * Routes related to user are defined below
   */
  router.post("/", users.userControl.create);
  router.post("/login", users.userControl.findOne);
  router.put("/", verify, users.userControl.update);
  router.get("/fetchUser", verify, users.userControl.findOneUser);
  app.use("/api/users", router);
};
