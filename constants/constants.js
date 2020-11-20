/**
 * error constants are exported
 */
exports.constants = {
  EMAIL_EXIST: {
    success: "false",
    message: "email already exists",
  },
  ERROR_NEW_USER: {
    success: "false",
    message: "error creating a new user",
  },
  SIGNUP_SUCCESS: {
    success: "true",
    message: "signup successful",
  },
  INVALID_LOGIN: {
    success: "false",
    message: "User does not exist",
  },
  WRONG_CREDS: {
    success: "false",
    message: "wrong password or email",
  },
  JWT_ERR: {
    success: "false",
    message: "JWT token cannot be sent",
  },
  LOGIN_SUCCESS: {
    success: "true",
    message: "user is logged in!",
  },
  EMAIL_NOT_FOUND: {
    success: "false",
    message: "email not found",
  },
  CANNOT_UPDATE_USER: {
    success: "false",
    message: "cannot update user",
  },
  UPDATE_SUCCESS: {
    success: "true",
    message: "user details are updated",
  },
  BOOK_CREATED: {
    success: "true",
    message: "Book created",
  },
  CANNOT_CREATE_BOOK: {
    success: "false",
    message: "book cannot be added",
  },
  OWNER_REQUIRED: {
    success: "false",
    message: "owner is required to fetch books",
  },
  BOOK_ERROR: {
    success: "false",
    message: "Cannot create book",
  },
  BOOK_ERROR_EXIST: {
    success: "false",
    message: "Book doesnot exist",
  },
  BOOK_UPDATE_SUCCESS: {
    success: "true",
    message: "update book success",
  },
  REQ_OWN_ISBN: {
    success: "false",
    message: "owner and isbn of book required to delete",
  },
  DELETE_SUCCESS: {
    success: "true",
    message: "Book was deleted successfully",
  },
  ACCESS_DENIED: {
    success: "false",
    message: "Login required",
  },
  BOOK_UPD_SUCCESS: {
    success: "true",
    message: "book is updated",
  },
  USER_NOT_FOUND: {
    success: "false",
    message: "user not found in DB",
  },
};
