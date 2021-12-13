const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    room: { type: String, required: true},
    name: { type: String},
    hour: { type: String},
    transport: { type: String, required: true},
    oxigen: { type: Boolean},
    destination: { type: String},
    estat: { type: [String, String], required: true}
});

module.exports = mongoose.model('Task', TaskSchema);
