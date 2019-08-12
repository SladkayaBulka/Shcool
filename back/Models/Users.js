const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const UserSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    login: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    teacherId: { type: Number},
    isadmin: {type: Boolean, default: false}
});
autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, {model:'User', field : 'UserId'});

mongoose.model('User', UserSchema);
