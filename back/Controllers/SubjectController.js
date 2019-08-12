var mongoose = require('mongoose');
var subject = mongoose.model('Subject');
var teacher = mongoose.model('Teacher');

function delTeacherSubject(subjectId) {
    teacher.deleteMany({subjectId: subjectId}).exec();
}

var getSubjects = (req, res) => {
    subject.find()
        .exec()
        .then(subjects => res.json(subjects))
        .catch(err => res.status(500).json(err));
};

var getSubject = (req, res) => {
    subject.find({ subjectId: req.params.subjectId })
        .exec()
        .then(subject => {
            res.json(subject)})
        .catch(err => res.status(500).json(err));
};

var postSubject = (req, res) => {
    new_sunject = {
       subject: req.body.subject
   }
   subject.create(new_sunject, function(err, result) {
       if (err) {
           res.json(err);
       } else {
           res.json(result);
       }
   });
};

var putSubject = (req, res) => {
    subject.findOneAndUpdate({ subjectId: req.params.subjectId }, req.body)
        .exec()
        .then(subject => res.json(subject))
        .catch(err => res.status(500).json(err));
};

var deleteSubject = (req, res) => {
    subject.deleteOne({ subjectId: req.params.subjectId }, (err) => {
        if (err) {
            res.json(err);
        } else {
            delTeacherSubject(req.params.subjectId);
            res.json({ success: true })
        }
    });
};

module.exports = { 
    getSubjects,
    getSubject,
    postSubject,
    putSubject,
    deleteSubject
};