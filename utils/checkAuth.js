const jwt = require("jsonwebtoken");
exports.checkAuth = (req, res, next) => {
  if (req.header("authorization")) {
    const token = req.header("authorization").split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      if (user.isActive) {
        req.user = user;
        next();
      } else {
        res.json({
          success: false,
          message: "you have to activate your account",
        });
      }
    } catch (err) {
      res.json({ success: false, message: " invaled token" });
    }
  } else {
    res.json({ success: false, message: "you have to send the token" });
  }
};
