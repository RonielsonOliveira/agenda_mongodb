exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user || null;
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    return res.status(403).render("403"); // ou uma view específica
  }
  next(err); // deixa outros erros seguirem
};
exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Voce precisa fazer login');
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
};
