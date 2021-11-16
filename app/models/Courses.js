const mongoose = require('mongoose')

const CourseSchema = new.mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modules: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module"
        }
    ],
    uploader: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
})

const CourseModel = mongoose.model('Course', CourseSchema)
module.exports = CourseModel