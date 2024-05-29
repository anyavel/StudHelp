// const {model, Schema} = require("mongoose");
import {model, Schema} from "mongoose";

const announcementSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: [2, 'Заголовок повинен містити хоча б 2 літери'],
        max: [50, 'Заголовок повинен містити до 50 літер']
    },
    body: {
        type: String,
        required: true,
        min: [2, 'Заголовок повинен містити хоча б 2 літери'],
        max: [200, 'Заголовок повинен містити до 200 літер']
    },
    attachments: {
        type: [String],
        default: []
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Announcement = model('announcement', announcementSchema);