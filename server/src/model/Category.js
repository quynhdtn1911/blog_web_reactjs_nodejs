const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

categorySchema.plugin(mongooseDelete, {deletedAt: true});

module.exports = mongoose.model('Category', categorySchema);