const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const teacherAuth = asyncHandler(async (req, res, next) => {
  let token;
  let AuthHeader = req.headers.authorization || req.headers.Authorization;
  // console.log(AuthHeader);
  if (AuthHeader || AuthHeader.startsWith("Bearer")) {
    token = AuthHeader.split(" ")[1];
    // console.log(token);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("user is not authorized");
      }
      req.UserID = decoded.UserID;
      console.log(req.UserID);
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("Token missing");
    }
  }
});

module.exports = teacherAuth;
