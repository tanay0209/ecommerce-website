const User = require("../models/user");
const { validationResult } = require("express-validator");
const { expressjwt: expressJwt } = require("express-jwt");
const jwt = require("jsonwebtoken");


// Controller to sign up a new user
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errorField: errors.array()[0].param,
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to create User",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

// Controller to sign in an user
exports.signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      errorField: errors.array()[0].param,
    });
  }

  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password does not match",
      });
    }
    // Creating a Token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // Put the token inside the cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // Response to the frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

// Controller to sign out an user
exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User signed out successfully" });
};

// Protected Routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

// Custom Middleware

exports.isAuthenticated = (req, res, next) => {
  let checker =
    req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      message: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      message: "You are not Admin, Access Denied",
    });
  }
  next();
};
