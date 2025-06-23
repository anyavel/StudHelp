// models/Appeal.js
import mongoose from "mongoose";

const appealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Опрацьоване', 'Активне'],
        default: 'Активне'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attachments: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Appeal = mongoose.model('Appeal', appealSchema);
