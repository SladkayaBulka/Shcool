const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const SubjectSchema = new mongoose.Schema({
    subjectId: { type: Number, required: true, unique: true },
    subject: { type: String, required: true}
});
autoIncrement.initialize(mongoose.connection);
SubjectSchema.plugin(autoIncrement.plugin, {model:'Subject', field : 'subjectId'});

mongoose.model('Subject', SubjectSchema);