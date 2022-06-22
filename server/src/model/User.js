const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, {timestamps: true});

userSchema.plugin(mongooseDelete, {deletedAt: true});
userSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('User', userSchema);