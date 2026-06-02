import jwt from "jsonwebtoken";

const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect("/admin/login");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decodedToken) => {
    if (error) {
      return res.redirect("/admin/login");
    }
    req.admin = decodedToken.id;
    console.log(`${req.headers.host}${req.originalUrl}`);
    next();
  });
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect("/");
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, decodedToken) => {
    if (error) {
      return res.redirect("/");
    }
    req.user = decodedToken.id;
    console.log(req.user);
    next();
  });
};

const checkAdminLogout = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error) => {
    if (error) {
      return next();
    }
    return res.redirect("/admin/dashboard");
  });
};

const checkUserLogout = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error) => {
    if (error) {
      return next();
    }
    return res.redirect("/account/dashboard");
  });
};

export { checkAdmin, checkUser, checkAdminLogout, checkUserLogout };
