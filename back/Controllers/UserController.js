var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var { jwtSecret } = require('../config');
var user = mongoose.model('User');

var logIn = (req, res) => {
    user.findOne({login: req.body.login, password: req.body.password })
        .exec()
        .then((user) => {
            if (!user) {
                res.status(401).json({ message: 'user does not exist!' });
            }
            var token = jwt.sign({
                username: user.username,
                userpass: user.username,
                useremail: user.useremail,
                isadmin: user.isadmin
            }, jwtSecret);
                res.json({user, token});
        })
        .catch(err => res.status(500).json({ message: err.message }));

}

module.exports = {
    logIn
};