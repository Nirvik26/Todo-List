const ToDo = require("../models/ToDoList");

exports.createToDo = async (req, res) => {
  try {
    const data = req.body;
    const todo = new ToDo(data);
    const result = await todo.save();
    console.log(result);
    res.status(200).send({ message: "Created new task!!!" });
  } catch (err) {
    console.log(err);
    res.status(err);
  }
};


exports.getAllToDo = async (req,res)=>{
    let {userId} = req.params;
    try {
        const result = await ToDo.find({createdBy:userId});
        res.send(result);
    } catch (error) {
        console.log(err);
        res.status(400).send(err);
    }
}

exports.updateToDo = async (req,res)=>{
    try {
        const {id} = req.params;
        const data = req.body;
        const result = await ToDo.findByIdAndUpdate(id, {$set:data}, {returnOriginal:false});
        console.log(result);
        res.status(200).send({mesage:"ToDo updated suceessfully"});
    } catch (error) {
        console.log(err);
        res.status(400).send(err);
    }
}

exports.deleteToDo = async (req,res)=>{
    try {
        const {id} = req.params;
        const result = await ToDo.findByIdAndDelete(id);
        console.log(result);
        res.send({message:"ToDo Task Deleted"});
    } catch (error) {
        console.log(err);
        res.status(400).send(err);
    }
}