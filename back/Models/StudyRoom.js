const mongoose = require('mongoose');

const StudyRoomSchema = new mongoose.Schema({
    teacherId: { type: Number, required: true},
    classroomId: { type: Number, required: true}
});

mongoose.model('StudyRoom', StudyRoomSchema);