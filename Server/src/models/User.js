// const {model, Schema} = require("mongoose");
// const Room = require('./Room');
import {model, Schema} from "mongoose";
import {Room} from './Room.js';

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: [2, 'Ім\'я повинне містити хоча б 2 літери'],
            max: [50, 'Ім\'я повинне містити до 50 літер']
        },
        lastName: {
            type: String,
            required: true,
            min: [2, 'Прізвище повинне містити хоча б 2 літери'],
            max: [50, 'Прізвище повинне містити до 50 літер']
        },
        fathersName: {
            type: String,
            required: true,
            min: [2, 'По-батькові повинно містити хоча б 2 літери'],
            max: [50, 'По-батькові повинно містити до 50 літер']
        },
        role: {
            required: true,
            type: String,
            enum: {
                values: [
                    'admin',
                    'student'
                ],
                message: '{VALUE} не є роллю'
            }
        },
        faculty: {
            required: true,
            type: String,
            enum: {
                values: [
                    'Біологічний',
                    'Географічний',
                    'Геологічний',
                    'Економічний',
                    'Електроніки та комп’ютерних технологій',
                    'Журналістики',
                    'Іноземних мов',
                    'Історичний',
                    'Культури і мистецтв',
                    'Механіко-математичний',
                    'Міжнародних відносин',
                    'Педагогічної освіти',
                    'Прикладної математики та інформатики',
                    'Управління фінансами та бізнесу',
                    'Фізичний',
                    'Філологічний',
                    'Філософський',
                    'Хімічний',
                    'Юридичний'
                ],
                message: '{VALUE} не є факультетом університету'
            }
        },
        //todo add regex for phone validation
        phoneNumber: {
            type: String,
            required: true,
            message: 'Номер телефону введено неправильно'
        },
        email: {
            type: String,
            // required: true,
            validate: {
                validator: function (v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} не є електронною поштою`
            },
        },
        password: {
            type: String,
            required: true,
            message: 'Пароль має містити 6-20 символів, мінімум 1 велику букву та мінімум 1 спецсимвол'
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room'
        }
    },
    {
        timestamps: true,
        versionKey: false
    })

export const User = model("User", userSchema);
