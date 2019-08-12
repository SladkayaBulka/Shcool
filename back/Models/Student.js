const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const StudentSchema = new mongoose.Schema({
    studentId: { type: Number, required: true, unique: true },
    fio: { type: String},
    sex: { type: String},
    birthday: { type: String},
    age: { type: Number},
    classroomId: { type: Number}
});
autoIncrement.initialize(mongoose.connection);
StudentSchema.plugin(autoIncrement.plugin, {model:'Student', field : 'studentId'});

mongoose.model('Student', StudentSchema);
