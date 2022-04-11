const authMiddleware = (req, res, next) => {
  if (!req.session.userLogged) {
    res.redirect("../userLogin");
  }
  next();
};

module.exports = authMiddleware;
