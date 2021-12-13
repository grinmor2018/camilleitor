const task = require('../models/task');
const taskCtlr = {};


taskCtlr.getTasks = async (req, res) => {
    const tasks = await task.find();
    res.json(tasks);
}

taskCtlr.createTask = async (req, res) => {
    const newtask = new task({
        room: req.body.room,
        name: req.body.name,
        hour: req.body.hour,
        transport: req.body.transport,
        destination: req.body.destination,
        oxigen: req.body.oxigen,
        estat: req.body.estat
    });
    await newtask.save();
    res.json('task created');
} 

taskCtlr.getTask = async (req, res) => {
    const oneTask = await task.findById(req.params.id);
    res.json(oneTask);
}

taskCtlr.updateTask = async (req, res) => {
    const newTask = {
        room: req.body.room,
        name: req.body.name,
        hour: req.body.hour,
        transport: req.body.transport,
        destination: req.body.destination,
        oxigen: req.body.oxigen,
        estat: req.body.estat
    };
    const editedTask = await task.findByIdAndUpdate(req.params.id, {$set: newTask}, {new: true});
    res.json('edited Task');
}

taskCtlr.deleteTask = async (req, res) => {
    const deletedTask = await task.findByIdAndRemove(req.params.id);
    res.json('deleted Task');
}

module.exports = taskCtlr;