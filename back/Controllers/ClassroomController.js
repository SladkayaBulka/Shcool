var mongoose = require('mongoose');
var student = mongoose.model('Student');
var classroom = mongoose.model('Classroom');
var studyrom = mongoose.model('StudyRoom');

function deleteteLink(classroomId) {
    studyrom.deleteMany({classroomId: classroomId}).exec();
} 

function uppdateStudent(classroomId){
    student.updateMany({classroomId: classroomId}, {classroomId : null}).exec();
}

var getClassrooms = (req, res) => {
    classroom.find()
        .exec()
        .then(classrooms => res.json(classrooms))
        .catch(err => res.status(500).json(err));
};

var getClassroom = (req, res) => {
    classroom.find({ classroomId: req.params.classroomId })
        .exec()
        .then(classroom => {
            res.json(classroom)})
        .catch(err => res.status(500).json(err));
};

var postClassroom = (req, res) => {
     new_classroom = {
        name: req.body.name,
        leader: req.body.leader,
    }
    classroom.create(new_classroom, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });

};

var putClassroom = (req, res) => {
    classroom.findOneAndUpdate({ classroomId: req.params.classroomId }, req.body)
        .exec()
        .then(classroom => res.json(classroom))
        .catch(err => res.status(500).json(err));
};

var deleteClassroom = (req, res) => {
    classroom.deleteOne({ classroomId: req.params.classroomId }, (err) => {
        if (err) {
            res.json(err);
        } else {
            uppdateStudent(req.params.classroomId);
            deleteteLink(req.params.classroomId);
            res.json({ success: true })
        }
    });
};



module.exports = {
    getClassrooms,
    getClassroom,
    postClassroom,
    putClassroom,
    deleteClassroom
};