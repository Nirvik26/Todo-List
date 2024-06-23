const mongoose = require("mongoose");
const { Schema } = mongoose;

const toDoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    completedOn: String,
    createdBy: {
      ref: "User",
      type: mongoose.Schema.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;
