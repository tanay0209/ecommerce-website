const express = require("express");
const router = express.Router();
const { signOut, signup, signIn, isSignedIn } = require("../controllers/auth");
const { check } = require("express-validator");

// Route for signing up an user : POST: http://localhost:8000/api/signup
router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
    check("email", "Invalid Email").isEmail(),
    check("password", "Password should of atleast length 5 ").isLength({
      min: 5,
    }),
  ],
  signup
);

// Route for signin an user : POST: http://localhost:8000/api/signin
router.post(
  "/signin",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Password is required").isLength({
      min: 1,
    }),
  ],
  signIn
);

// Route for signing out an user : GET: http://localhost:8000/api/signout
router.get("/signout", signOut);

module.exports = router;
