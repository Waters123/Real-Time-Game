const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token == "") {
    req.isAuth = false;
    return next();
  }

  let decToken;
  try {
    decToken = await jwt.verify(token, "secretkey");
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userID = decToken.userID;
  next();
};
