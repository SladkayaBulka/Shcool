var mongoose = require('mongoose');
var student = mongoose.model('Student');



var getStudents = (req, res) => {
    student.find()
        .exec()
        .then(students => res.json(students))
        .catch(err => res.status(500).json(err));
};

var getStudent = (req, res) => {
    student.findOne({ studentId: req.params.studentId })
        .exec()
        .then(student => {
            res.json(student)})
        .catch(err => res.status(500).json(err));
};

var getOneClassStudents = (req, res) => {
    student.find({ classroomId: req.params.classroomId })
        .exec()
        .then(students => {
            res.json(students)})
        .catch(err => res.status(500).json(err));
};

var postStudent = (req, res) => {
     new_student = {
        fio: req.body.fio,
        sex: req.body.sex,
        birthday: req.body.birthday,
        age: getAge(req.body.birthday),
        classroomId: req.body.classroomId
    }
    student.create(new_student, function(err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });

};

var putStudent = (req, res) => {
    put_student = {
        fio : req.body.fio,
        sex :  req.body.sex,
        birthday : req.body.birthday,
        age : getAge(req.body.birthday),
        classroomId : req.body.classroomId
    }
    student.findOneAndUpdate({ studentId: req.params.studentId }, put_student, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
           res.json(result);
        }
    });
};

var deleteStudent = (req, res) => {
    student.deleteOne({ studentnId: req.params.studentnId })
        .exec()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(500).json(err));
};


function getAge(dateString) {
    var age = 0;
    var today = new Date();
    var birthDate = new Date(dateString);
    age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}




module.exports = {
    getStudents,
    postStudent,
    deleteStudent,
    putStudent,
    getStudent,
    getOneClassStudents

};