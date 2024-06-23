const express = require("express");
const User = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const secretkey = process.env.JWT_SECRET;

async function registerUser(req, res) {
  const { firstName, lastName, username, password } = req.body;
  console.log(req.body);

  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    duplicate = await User.findOne({ username });
    if (duplicate && duplicate.length > 0) {
      res.status(400).send({ message: "Username is already taken" });
    }
    let user = new User({ firstName, lastName, username, password });
    const result = await user.save();
    console.log(result);
    res.status(201).send({ message: "User sucessfully registered!!!" });
    res.send("success");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: "Authentication failed!!!" });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Password Error" });
    }
    const token = jwt.sign({ suerId: user?._id }, secretkey, {
      expiresIn: "2h",
    });
    const finalData = {
      userId: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      token,
    };
    return res.send(finalData);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

const AuthController = {
  registerUser,
  loginUser,
};

module.exports = AuthController;
