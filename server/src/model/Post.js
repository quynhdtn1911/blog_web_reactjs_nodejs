const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    image: {
        type: String,
        default: ''
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    }
}, {timestamps: true});

postSchema.plugin(mongooseDelete, {deletedAt: true});

module.exports = mongoose.model('Post', postSchema);