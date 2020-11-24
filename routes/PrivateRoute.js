module.exports = (app) => {
  const verify = require("../controllers/AuthController");
  var router = require("express").Router();
  /**
   * authentication middleware
   */
  router.get("/", verify, (req, res) => {
    res.status(200).send("Private route unlocked!");
  });
  app.use("/api/privateRoute", router);
};
