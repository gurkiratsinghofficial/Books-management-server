const jwt = require("jsonwebtoken");
const { constants } = require("../constants/constants");
const dotenv = require("dotenv").config();

/**
 * @description:This functions check for the JSt token for all the private routes
 * @param {object} req
 * @param {object} res
 * @param {func} next
 */
module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send(constants.ACCESS_DENIED);

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    if (verified === null)
      return res.status(500).send("user not authenticated");
    req.id = verified.id;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};
