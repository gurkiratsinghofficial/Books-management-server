const { books } = require("../models");
const db = require("../models");
const Book = db.books;
const { validation } = require("../validation/validation");
const { constants } = require("../constants/constants");
const Op = db.Sequelize.Op;
const User = db.users;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

/**
 * Class bookControl contains methods-
 * Create(for creating new book entry)
 * findAllBooks(for fetching all the books for a particular user ID)
 * updateBook(update information of book)
 * delete(delete a book from DB) *
 */
exports.bookControl = {
  //Create(for creating new book entry)
  create: async (req, res) => {
    const token = req.header("Authorization");
    const userID = jwt.verify(token, process.env.JWT_KEY);
    if (!userID) return res.send(constants.USER_NOT_SIGN);
    const { title, author, pages, description, price, isbn } = req.body;
    const owner = userID.id;
    try {
      const { error } = validation.bookValidation({
        title,
        author,
        pages,
        description,
        price,
        isbn,
        owner,
      });
      if (error)
        res.status(500).send({
          success: "false",
          message: error.details[0].message,
        });

      const book = {
        title: title,
        author: author,
        pages: pages,
        description: description,
        price: price,
        isbn: isbn,
        owner: owner,
      };
      const newbook = await Book.create(book);
      if (newbook) {
        res.status(200).send(newbook);
      } else res.status(500).send(constants.CANNOT_CREATE_BOOK);
    } catch (err) {
      res.send(err.message);
    }
  },
  findAllBooks: async (req, res) => {
    // * findAllBooks(for fetching all the books for a particular user ID)
    const token = req.header("Authorization");
    const userID = jwt.verify(token, process.env.JWT_KEY);
    if (!token) return res.status(401).send("access denied");
    const id = userID.id;
    try {
      const userinfo = await User.findOne({ where: { id: id } });
      if (!userinfo) return res.status(500).send(constants.INVALID_LOGIN);

      const booksinfo = await Book.findAll({ where: { owner: userinfo.id } });
      if (booksinfo) res.status(200).send(booksinfo);
      else res.status(500).send(constants.BOOK_ERROR);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // * updateBook(update information of book)
  updateBook: async (req, res) => {
    const token = req.header("Authorization");
    const userID = jwt.verify(token, process.env.JWT_KEY);
    const { title, author, pages, description, price, isbn } = req.body;
    const owner = userID.id;
    try {
      const { error } = validation.bookValidation({
        title,
        author,
        pages,
        description,
        price,
        isbn,
        owner,
      });
      if (error)
        return res.status(500).send({
          success: "false",
          message: error.details[0].message,
        });

      const bookinfo = await Book.findOne({
        where: { isbn: isbn, owner: owner },
      });
      if (bookinfo) {
        const updateBookInfo = await bookinfo.update({
          title: title,
          author: author,
          pages: pages,
          description: description,
          price: price,
          owner: owner,
        });
        if (!updateBookInfo) res.status(500).send("1st");
        else return res.send(bookinfo);
      } else return res.status(500).send("2nd");
    } catch (err) {
      res.status(500).send({
        success: "false",
        message: err,
      });
    }
  },
  // * delete(delete a book from DB) *
  delete: async (req, res) => {
    try {
      const token = req.header("Authorization");
      const userID = jwt.verify(token, process.env.JWT_KEY);
      const owner = userID.id;
      const { isbn } = req.body;

      if (!owner || !isbn) return res.status(500).send(constants.REQ_OWN_ISBN);
      const deleteBook = await Book.destroy({
        where: { isbn: isbn, owner: owner },
      });
      if (deleteBook == 1) {
        return res.send(constants.DELETE_SUCCESS);
      } else res.status(500).send(constants.BOOK_ERROR_EXIST);
    } catch (err) {
      return res.status(500).send(err);
    }
  },
};
