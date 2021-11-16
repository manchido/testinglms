const mongoose = require('mongoose')

const MaterialSchema = new.mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    section1: {
        type: String,
        required: true
    },
    section2: {
        type: String
    }, 
    section3: {
        type: String
    },
    cover: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    uploader: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    button1: {
        type: String
    },
    button2: {
        type: String
    }
})

const MaterialModel = mongoose.model('Material', MaterialSchema)
module.exports = MaterialModel