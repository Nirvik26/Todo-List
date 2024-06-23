const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoutes");
const toDoRoutes = require("./routes/ToDoRoutes");


PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/todo", toDoRoutes);


mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("DB successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`The server has start at ${PORT}`);
});
