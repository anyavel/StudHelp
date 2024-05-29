// const Joi = require("joi")
import Joi from "joi";

class UserValidator {
    constructor() {
        this.emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        this.phoneRegex = /^\+?3?8?(0[\s\.-]\d{2}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$/;

        this.firstName = Joi.string().min(2).max(50).trim();
        this.lastName = Joi.string().min(2).max(50).trim();
        this.fathersName = Joi.string().min(2).max(50).trim();
        this.role = Joi.valid('admin', 'student');
        this.faculty = Joi.valid('Біологічний',
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
            'Юридичний');

        this.phone = Joi.string().regex(this.phoneRegex);
        this.email = Joi.string().regex(this.emailRegex);
        this.password = Joi.string().regex(this.passwordRegex);

        // this.emailRegex = this.emailRegex.bind(this);
        // this.passwordRegex = this.passwordRegex.bind(this);
        // this.firstName = this.firstName.bind(this);
        // this.lastName = this.lastName.bind(this);
        // this.fathersName = this.fathersName.bind(this);
        // this.role = this.role.bind(this);
        // this.faculty = this.faculty.bind(this);
        // this.phone = this.phone.bind(this);
        // this.email = this.email.bind(this);
        // this.password = this.password.bind(this);
        
        this.createUser = Joi.object({
            firstName: this.firstName.required(),
            lastName: this.lastName.required(),
            fathersName: this.fathersName.required(),
            role: this.role.required(),
            faculty: this.faculty.required(),
            phone: this.phone.required(),
            email: this.email.required(),
            password: this.password.required(),
        });
    
        this.updateUser = Joi.object({
            phone: this.phone.required(),
            email: this.email.required(),
        });
    
        this.loginUser = Joi.object({
            email: this.email.required(),
            password: this.password.required(),
        });
    }

} 

export const authValidator =  new UserValidator();