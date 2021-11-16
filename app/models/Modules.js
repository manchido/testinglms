const mongoose = require('mongoose')

const ModuleSchema = new.mongoose.Schema({
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
    material: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Material"
        }
    ], 
    uploader: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
})

const ModuleModel = mongoose.model('Module', ModuleSchema)
module.exports = ModuleModel