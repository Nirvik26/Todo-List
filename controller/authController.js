const express = require("express");
const User = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config;

const secretkey = process.env.JWT_SECRET;

async function registerUser(req, res) {
  const { firstName, lastName, username, password } = req.body;
  try {
    duplicate = await username.findBy({ username });
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
  try {
    const user = await user.findOne({ username });
    if (!user) {
      res.status(400).send({ error: "Authentication failed!!!" });
    }
    const isPasswordValid = await user.comparePassword({ password });
    if (!isPasswordValid) {
      res.status(400).send({ error: "Password Error" });
    }
    const token = jwt.sign({ suerId: user?._id }, secretkey, {
      expiresIn: "2h",
    });
    const finalData = {
      userId: user?._id,
      username: user?.username,
      firstname: user?.firstname,
      lastname: user?.lastname,
      token,
    };
    res.send(finalData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
}

const AuthController = {
  registerUser,
  loginUser,
};

module.exports = AuthController;
