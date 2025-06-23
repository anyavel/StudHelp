// const {model, Schema} = require("mongoose");
import {model, Schema} from "mongoose";


const roomSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    photos: {
        type: [String]
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    maxPeople: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Room = model('Room', roomSchema);