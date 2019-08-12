var mongoose = require('mongoose');
var teacher = mongoose.model('Teacher');
var studyrom = mongoose.model('StudyRoom');
var user = mongoose.model('User');

function createLink(teacherId, classroomId) {
    studyrom.create({classroomId: classroomId, teacherId: teacherId}).exec();
} 
function deleteteLink(teacherId) {
    studyrom.deleteMany({teacherId: teacherId}).exec();
} 
function uppdateStudent(classroomId, teacherId, oldclassroomId){
    student.updateMany({classroomId: oldclassroomId, teacherId: teacherId }, {classroomId : classroomId}).exec();
} 
function addUser(login, teacherId, password, isadmin){
    student.create({login: login, teacherId: teacherId, password: password, isadmin: isadmin}).exec();
} 

function delUser(teacherId){
    user.findOneAndDelete({teacherId: teacherId}).exec();
}

var addClassroom = (req, res) => {
    studyrom.create({teacherId: req.body.teacherId, classroomId: req.body.classroomId}, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
};

var getTeachersOneClass = (req, res) => {
    teacher.find({ classroomId: req.params.classroomId })
        .exec()
        .then(teachers => {
            res.json(teachers)})
        .catch(err => res.status(500).json(err));
};

var getTeachers = (req, res) => {
    teacher.find()
        .exec()
        .then(teachers => res.json(teachers))
        .catch(err => res.status(500).json(err));
};

var getTeacher = (req, res) => {
    teacher.findOne({ teacherId: req.params.teacherId })
        .exec()
        .then(teacher => {
            res.json(teacher)})
        .catch(err => res.status(500).json(err));
};

var postTeacher = (req, res) => {
    new_teacher = {
       fio: req.body.fio,
       subjectId: req.body.subjectId,
       position: req.body.position,
       classroomId: req.body.classroomId
   }
   teacher.create(new_teacher, function(err, result) {
       if (err) {
           res.json(err);
       } else {
           createLink(result.teacherId, result.classroomId);
           addUser(req.body.login, result.teacherId, req.body.password, req.body.isadmin);
           console.log(result.teacherId + "  " + result.classroomId);
           res.json(result);
       }
   });

};

var putTeacher = (req, res) => {
    put_teacher = {
       fio: req.body.fio,
       subjectId: req.body.subjectId,
       position: req.body.position,
       classroomId: req.body.classroomId
    }
    teacher.findOneAndUpdate({ teacherId: req.params.teacherId }, put_teacher, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
           uppdateStudent(req.body.classroomId, req.params.teacherId, req.body.oldclassromId)
           res.json(result);
        }
    });
};

var deleteTeacher = (req, res) => {
    teacher.deleteOne({ teacherId: req.params.teacherId}, function(err) {
        if (err) {
            deleteteLink(req.params.teacherId);
            delUser(req.params.teacherId);
            res.status(500).json(err);
        } else {
            res.json({ success: true })
        }
    })
};

module.exports = {
    getTeachers,
    postTeacher,
    deleteTeacher,
    putTeacher,
    getTeacher,
    addClassroom,
    getTeachersOneClass
};