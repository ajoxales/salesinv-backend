const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  UserModel.find({ username: req.body.username }).then((existingUser) => {
    if (existingUser.length > 0) {
      res
        .status(409)
        .send({ error: true, message: "Username already registered" });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        username: req.body.username,
        password: hash,
        role: "user",
      });

      newUser.save().then(() => {
        UserModel.find().then((data) => res.send(data));
      });
    }
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  UserModel.findOne({ username: username }).then((foundUser) => {
    if (foundUser === null) {
      res
        .status(409)
        .send({ error: true, message: "Invalid username or password" });
    } else {
      const passwordMatch = bcrypt.compareSync(password, foundUser.password);

      if (passwordMatch === false) {
        res
          .status(409)
          .send({ error: true, message: "Invalid username or password" });
      } else {
        const redirectUrl =
          foundUser.role === "admin" ? "/portal/admin" : "/portal/user";

        const token = jwt.sign(
          { username: foundUser.username, role: foundUser.role },
          "salesinv",
          { expiresIn: "30s" }
        );

        res.cookie("token", token, {
          maxAge: 7 * 60 * 60 * 1000, // 7 days
        });

        res.send({
          error: false,
          redirectUrl: redirectUrl,
        });
      }
    }
  });
};

module.exports = {
  createUser,
  loginUser,
};
