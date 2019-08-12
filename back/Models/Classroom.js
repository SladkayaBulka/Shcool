const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const ClassroomSchema = new mongoose.Schema({
    classroomId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    leader: { type: String, required: true}
});
autoIncrement.initialize(mongoose.connection);
ClassroomSchema.plugin(autoIncrement.plugin, {model:'Classroom', field : 'classroomId'});

mongoose.model('Classroom', ClassroomSchema);
