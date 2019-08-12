const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const TeacherSchema = new mongoose.Schema({
    teacherId: { type: Number, required: true, unique: true },
    fio: { type: String, required: true },
    subjectId: { type: String, required: true},
    position: { type: String, required: true}
});
autoIncrement.initialize(mongoose.connection);
TeacherSchema.plugin(autoIncrement.plugin, {model:'Teacher', field : 'teacherId'});

mongoose.model('Teacher', TeacherSchema);
