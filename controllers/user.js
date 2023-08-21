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
          foundUser.role === "admin"
            ? "/portal/admin/users"
            : `/portal/user/products`;

        const token = jwt.sign(
          {
            id: foundUser._id,
            name: foundUser.firstName,
            username: foundUser.username,
            role: foundUser.role,
          },
          "salesinv",
          { expiresIn: "1m" }
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

const getUsers = (req, res) => {
  UserModel.find().then((data) => {
    res.send(data);
  });
};

const getUser = (req, res) => {
  UserModel.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ error: true, message: "User not found" });
      }
      res.sendStatus(201);
      res.send(data);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).send({ error: true, message: "Internal server error" });
    });
};

const updateUser = (req, res) => {
  const filter = { _id: req.body._id };
  const updateUserValues = {
    firstName: req.body.firstName,
    lastName: req.body.username,
    username: req.body.username,
    password: req.body.password,
  };

  UserModel.findOneAndUpdate(filter, updateUserValues).then(() =>
    res.sendStatus(201)
  );
};

const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.body.id).then(() => {
    UserModel.find().then((data) => res.send(data));
  });
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
