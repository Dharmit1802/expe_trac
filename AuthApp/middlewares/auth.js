const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    var token =  req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ","");
    
    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }
    next();
  } catch (error) {
    console.log(token);

    return res.status(401).json({
      success: false,
      message: "something went wrong while verifying the token",
    });
  }
};