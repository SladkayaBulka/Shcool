var student = require('./Controllers/StusentController');
var classroom = require('./Controllers/ClassroomController');
var teacher = require('./Controllers/TeacherController');
module.exports = (app) => {
    app.get('/student', student.getStudents),
    app.post('/student', student.postStudent),
    app.put('/student/:studentId', student.putStudent),
    app.delete('/student/:studentId', student.deleteStudent),
    app.get('/student/:classroomId', student.getOneClassStudents),
    app.get('/classroom', classroom.getClassrooms),
    app.get('/classroom/:classroomId', classroom.getClassroom),
    app.post('/classroom', classroom.postClassroom),
    app.put('/classroom/:classroomId', classroom.putClassroom),
    app.delete('/classroom/:classroomId',classroom.deleteClassroom),
    app.get('/teacher/:teacherId', teacher.getTeacher),
    app.get('/teacher', teacher.getTeachers),
    app.post('/teacher', teacher.postTeacher),
    app.put('/teacher/:teacherId', teacher.putTeacher),
    app.delete('/teacher/:teacherId',teacher.deleteTeacher)
};

