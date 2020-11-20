module.exports = (app) => {
  const books = require("../controllers/BookController ");
  const verify = require("../controllers/AuthController");

  var router = require("express").Router();
  /**
   * Routes related to books are defined below
   */
  router.post("/", verify, books.bookControl.create);
  router.get("/getBooks", verify, books.bookControl.findAllBooks);
  router.put("/", verify, books.bookControl.updateBook);
  router.post("/deleteBook", verify, books.bookControl.delete);
  // router.put("/", books.update);
  app.use("/api/books", router);
};
