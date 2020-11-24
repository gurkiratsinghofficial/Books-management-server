const dotenv = require("dotenv").config();
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validation } = require("../validation/validation");
const { constants } = require("../constants/constants");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
/**
 * Class userControl contains methods:-
 * create(creates a user entry in DB)
 * findOne(checks if user exist)
 * update(update user information)
 */
exports.userControl = {
  // * create(creates a user entry in DB)
  create: async (req, res) => {
    const {
      firstname,
      lastname,
      email,
      password,
      gender,
      profession,
      birthday,
      confirmed,
    } = req.body;

    try {
      //**********if email is confirmed*********/
      // const { error } = validation.signupValidation(req.body);
      // if (error)
      //   return res.status(500).send({
      //     success: "false",
      //     error: error.details[0].message,
      //   });

      //check if email Exists
      const emailExist = await User.findOne({ where: { email: email } });
      if (emailExist) return res.status(300).json(constants.EMAIL_EXIST);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        gender: gender,
        profession: profession,
        birthday: birthday,
        confirmed: confirmed,
      };
      const newuser = await User.create(user);
      if (!newuser) return res.status(500).send(constants.ERROR_NEW_USER);

      //***************code for email confirmation**********
      // if(newuser)
      // {
      //     try {
      //           const emailToken = jwt.sign(
      //             {id:newuser.id},
      //             process.env.JWT_KEY,
      //             {
      //               expiresIn: '1d',
      //             },
      //           );

      //           const url = `http://localhost:3000/confirmation/${emailToken}`;

      //           await transporter.sendMail({
      //             to: newuser.email,
      //             subject: 'Confirm Email',
      //             html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
      //           });
      //           res.send("email sent")
      //         } catch (e) {
      //           console.log(e);
      //         }
      // }
      res.status(200).send(constants.SIGNUP_SUCCESS);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  // * findOne(checks if user exist)
  findOne: async (req, res) => {
    const { email, password } = req.body;
    try {
      //validate incoming request
      const { error } = validation.loginValidation(req.body);
      if (error)
        return res.status(500).send({
          success: "false",
          message: error.details[0].message,
        });

      const userinfo = await User.findOne({ where: { email: email } });
      if (!userinfo) return res.status(500).send(constants.INVALID_LOGIN);

      const valid = await bcrypt.compare(password, userinfo.password);
      if (!valid) return res.status(500).send(constants.WRONG_CREDS);

      const token = jwt.sign({ id: userinfo.id }, process.env.JWT_KEY);
      if (!token) return res.status(500).send(constants.JWT_ERR);
      else
        return res.header("Authorization", token).send({
          success: "true",
          message: "user is logged in",
          userinfo,
          token,
        });
      // .send(constants.LOGIN_SUCCESS);
    } catch (err) {
      res.send(err);
    }
  },
  findOneUser: async (req, res) => {
    const token = req.header("Authorization");
    const userID = jwt.verify(token, process.env.JWT_KEY);
    if (!userID) return res.send(constants.USER_NOT_SIGN);
    try {
      const userinfo = await User.findOne({ where: { id: userID.id } });
      if (!userinfo) return res.status(500).send(constants.INVALID_LOGIN);
      else
        return res.send({
          success: "true",
          message: "user fetched",
          userinfo,
        });
      // .send(constants.LOGIN_SUCCESS);
    } catch (err) {
      res.send(err);
    }
  },
  // * update(update user information)
  update: async (req, res) => {
    const token = req.header("Authorization");
    const userID = jwt.verify(token, process.env.JWT_KEY);
    if (!userID) return res.send(constants.USER_NOT_SIGN);
    const { firstname, lastname, gender, profession, birthday } = req.body;
    const id = userID.id;

    try {
      const { error } = validation.updateValidation({
        firstname,
        lastname,
        gender,
        profession,
        birthday,
      });
      if (error)
        res.status(500).send({
          success: "false",
          message: error.details[0].message,
        });

      const userinfo = await User.findOne({ where: { id: id } });
      if (!userinfo) res.status(500).send(constants.USER_NOT_FOUND);
      if (userinfo) {
        const updated = await userinfo.update({
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          profession: profession,
          birthday: birthday,
        });
        if (!updated) res.status(500).send(constants.CANNOT_UPDATE_USER);
        else res.send(updated);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
